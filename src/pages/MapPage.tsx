import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { ArrowUpRight, Building2, Check, ChevronDown, Layers3, Network, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LayerCakeGraph, buildLayerCakeRows } from '../components/RelationshipGraph';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { Badge } from '../components/ui/Badge';
import { companies } from '../data/companies';
import { layers } from '../data/layers';
import { findConnectedNodeIds, modeCompanies } from '../data/selectors';
import { useAppStore } from '../store/useAppStore';
import { companyTypeLabel, displayCountry, displayTerms } from '../lib/labels';

type ExplorerSelection = { type: 'company'; id: string } | { type: 'layer-row'; id: string };

type LayerFilterOption = {
  value: string;
  label: string;
};

type LayerRoleDetail = {
  title: string;
  does: string;
  role: string;
  importance: string;
  upperRelation: string;
  lowerRelation: string;
  leverage: string;
};

const layerRoleDetails: Record<string, LayerRoleDetail> = {
  applications: {
    title: 'AI 应用',
    does: '把通用模型能力包装成用户愿意付费的产品、工作流和行业解决方案，例如办公 Copilot、创意生成、开发者工具、自动驾驶和机器人软件。',
    role: '把模型能力嵌入办公、创作、编程、机器人和行业流程，是 AI 从技术能力转成收入、效率和用户体验的出口。',
    importance:
      '应用层决定需求是否真实存在。成功应用会反向拉动模型推理、云资源、芯片采购和能源合同，是整条链条的需求信号。',
    upperRelation: '上层关系：它已经是价值兑现的最上层，直接面对企业、开发者和消费者；需求增长会成为整条 AI 链条的采购信号。',
    lowerRelation: '下层关系：直接依赖模型层提供推理、智能体、多模态和工具调用能力，同时把用户数据、场景反馈和付费需求反向传给模型层。',
    leverage: '关注付费场景、工作流粘性、数据闭环和分发入口。',
  },
  models: {
    title: '模型',
    does: '把算力、数据、算法和训练流程沉淀成可调用的智能能力，并通过 API、模型服务或开源生态交付给应用。',
    role: '把算力、数据和训练方法转化为可调用的智能，承担语言、视觉、科学推理和智能体规划的核心能力层。',
    importance: '模型层决定能力上限，也决定推理成本和生态议价能力。模型效率提升会改变应用可行性，并重塑基础设施需求。',
    upperRelation: '上层关系：向 AI 应用输出语言、视觉、代码、规划和推理能力；应用侧的真实付费需求会决定模型该优化什么能力和成本结构。',
    lowerRelation: '下层关系：直接消耗基础设施层的 GPU 云、数据平台、网络、存储和推理服务；训练与推理规模决定基础设施扩容节奏。',
    leverage: '关注训练效率、推理成本、多模态能力、工具调用和生态接口。',
  },
  infrastructure: {
    title: '基础设施',
    does: '把数据中心、服务器、网络、存储、云平台和调度系统组织成稳定可用的 AI 工厂，让模型训练和推理能够规模化运行。',
    role: '把电力、土地、服务器、网络、存储和云平台组织成可用的 AI 工厂，让训练和推理能够稳定、规模化运行。',
    importance: '基础设施层连接物理资源和软件能力，是 AI 资本开支最密集的承载层。它决定集群上线速度、利用率和单位算力成本。',
    upperRelation: '上层关系：向模型层提供训练集群、推理集群、数据管道和平台服务；模型规模越大，对集群密度、网络和调度效率要求越高。',
    lowerRelation: '下层关系：直接依赖芯片层的 GPU、HBM、服务器、光模块和先进封装供给，也受能源层供电、并网和冷却能力约束。',
    leverage: '关注数据中心供给、液冷、网络互联、GPU 云和运维编排能力。',
  },
  chips: {
    title: '芯片',
    does: '提供 GPU/ASIC、HBM、晶圆制造、先进封装、设备材料和 EDA/IP，是把算法需求转成硬件算力的硅基供给层。',
    role: '提供 GPU、存储、制造、封装、材料和 EDA 等硅基能力，是模型训练与推理效率的硬件底座。',
    importance: '芯片层决定算力供给速度、能效和成本曲线。先进制程、HBM、封装与设备材料任何一环受限，都会影响上层扩张。',
    upperRelation: '上层关系：向基础设施层交付 GPU、AI 服务器、网络芯片、HBM 和配套硬件；基础设施扩容速度取决于芯片交付与系统集成能力。',
    lowerRelation: '下层关系：直接受能源层的电力、散热和长期供电成本约束；芯片能效越低，对数据中心电力和冷却压力越大。',
    leverage: '关注 GPU/HBM 供需、先进封装、制程产能、EDA/IP 与国产替代瓶颈。',
  },
  energy: {
    title: '能源',
    does: '提供稳定电力、并网容量、长期购电协议、储能和冷却用电，是 AI 数据中心持续运行的最底层物理约束。',
    role: '提供电力、并网、制冷用电和长期能源合约，是 AI 数据中心持续运行的最底层约束。',
    importance: '当模型和应用带来持续推理需求时，电力可获得性会成为新的算力瓶颈。能源层影响选址、交付周期和长期运营成本。',
    upperRelation: '上层关系：直接支撑芯片和基础设施层的高密度集群运行；电力可获得性会影响数据中心选址、上线周期和算力单位成本。',
    lowerRelation: '下层关系：它是链条底座，没有更下层的 AI 产业环节；需要向外部电网、发电资产、储能和政策审批寻找供给弹性。',
    leverage: '关注电网接入、PPA、可调度电源、储能、冷却能耗和大型数据中心集群选址。',
  },
};

const companyMatchesQuery = (
  company: (typeof companies)[number],
  query: string,
  layerNameById: Map<string, string>,
) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const searchable = [
    company.id,
    company.logo,
    company.name.zh,
    company.name.en,
    company.basicInfo.country,
    displayCountry(company.basicInfo.country),
    company.basicInfo.headquarters,
    companyTypeLabel[company.basicInfo.type],
    ...company.aiBusiness.coreProducts,
    ...company.aiBusiness.layerIds.map((id) => layerNameById.get(id) ?? id),
  ]
    .join(' ')
    .toLowerCase();

  return searchable.includes(normalizedQuery);
};

const LayerFilterListbox = ({
  options,
  value,
  onChange,
}: {
  options: LayerFilterOption[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleOptionSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className="map-page-filter-select">
      <span id={labelId} className="sr-only">
        选择产业层
      </span>
      <button
        type="button"
        role="combobox"
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className="group flex h-12 w-full items-center gap-3 rounded-full border border-[#d2d2d7] bg-white px-4 text-left text-sm font-semibold text-[#1d1d1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(29,29,31,0.05)] outline-none transition hover:border-[#b8d8ff] hover:bg-[#fbfdff] focus:border-[#8bbdff] focus:ring-2 focus:ring-[#0071e3]/15"
      >
        <Layers3 className="h-4 w-4 shrink-0 text-[#0071e3]" />
        <span className="min-w-0 flex-1 truncate">{selectedOption?.label ?? '全部产业层'}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#86868b] transition duration-200 group-hover:text-[#0071e3] ${open ? 'rotate-180 text-[#0071e3]' : ''}`}
        />
      </button>
      {open ? (
        <div className="map-page-filter-select__popover">
          <div id={listboxId} role="listbox" aria-labelledby={labelId} className="map-page-filter-select__list p-1.5">
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    selected
                      ? 'bg-[#e8f2ff] text-[#005ecb] shadow-[inset_0_0_0_1px_rgba(0,113,227,0.10)]'
                      : 'text-[#2f2f32] hover:bg-[#f5f8fc] hover:text-[#005ecb]'
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                      selected ? 'border-[#8bbdff] bg-white text-[#0071e3]' : 'border-transparent text-transparent'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const MapPage = () => {
  const { mode, setSelectedId } = useAppStore();
  const [layerFilter, setLayerFilter] = useState('all');
  const [companyQuery, setCompanyQuery] = useState('');
  const [selection, setSelection] = useState<ExplorerSelection>({ type: 'layer-row', id: 'applications' });
  const graphShellRef = useRef<HTMLDivElement | null>(null);
  const [graphHeight, setGraphHeight] = useState<number | null>(null);

  const layerRows = useMemo(() => buildLayerCakeRows(layers, companies, mode), [mode]);
  const layerFilterOptions = useMemo<LayerFilterOption[]>(
    () => [{ value: 'all', label: '全部产业层' }, ...layers.map((layer) => ({ value: layer.id, label: layer.name.zh }))],
    [],
  );
  const layerNameById = useMemo(() => new Map(layers.map((layer) => [layer.id, layer.name.zh])), []);
  const rowIdByLayerId = useMemo(
    () => new Map(layerRows.flatMap((row) => row.layerIds.map((layerId) => [layerId, row.id] as const))),
    [layerRows],
  );

  const visibleCompanies = useMemo(
    () =>
      modeCompanies(mode).filter((company) => {
        if (layerFilter === 'all') return true;
        return company.aiBusiness.layerIds.includes(layerFilter);
      }),
    [layerFilter, mode],
  );

  const selectedCompany = useMemo(
    () => (selection.type === 'company' ? companies.find((company) => company.id === selection.id) ?? null : null),
    [selection],
  );

  const selectedLayerRow = useMemo(() => {
    if (selection.type === 'layer-row') return layerRows.find((row) => row.id === selection.id) ?? layerRows[0];
    if (selectedCompany) {
      return (
        layerRows.find((row) => selectedCompany.aiBusiness.layerIds.some((layerId) => row.layerIds.includes(layerId))) ??
        layerRows[0]
      );
    }
    return layerRows[0];
  }, [layerRows, selectedCompany, selection]);

  const selectedLayerDetail = selectedLayerRow ? layerRoleDetails[selectedLayerRow.id] : null;
  const selectedLayerLabel =
    layerFilter === 'all' ? '全部产业层' : layers.find((layer) => layer.id === layerFilter)?.name.zh ?? layerFilter;
  const selectedLabel = selectedCompany?.name.zh ?? selectedLayerDetail?.title ?? selectedLayerRow?.title ?? '未选择';
  const connected = selectedCompany ? findConnectedNodeIds('company', selectedCompany.id) : null;

  const representativeCompanies = useMemo(() => {
    const visibleCompanyIds = new Set(visibleCompanies.map((company) => company.id));
    return (selectedLayerRow?.featuredCompanies ?? []).filter((company) => visibleCompanyIds.has(company.id));
  }, [selectedLayerRow?.featuredCompanies, visibleCompanies]);

  const filteredCompanies = useMemo(
    () => representativeCompanies.filter((company) => companyMatchesQuery(company, companyQuery, layerNameById)),
    [companyQuery, layerNameById, representativeCompanies],
  );

  const panelCompanies = useMemo(() => {
    return filteredCompanies
      .slice()
      .sort((a, b) => {
        const selectedDelta = Number(b.id === selectedCompany?.id) - Number(a.id === selectedCompany?.id);
        if (selectedDelta !== 0) return selectedDelta;

        return a.name.zh.localeCompare(b.name.zh, 'zh-Hans-CN');
      });
  }, [filteredCompanies, selectedCompany?.id]);

  const handleSelectRow = (rowId: string) => {
    setSelection({ type: 'layer-row', id: rowId });
    setSelectedId(null);
  };

  const handleSelectLayer = (layerId: string) => {
    const rowId = rowIdByLayerId.get(layerId);
    if (rowId) handleSelectRow(rowId);
  };

  const handleSelectCompany = (companyId: string) => {
    setSelection({ type: 'company', id: companyId });
    setSelectedId(companyId);
  };

  const handleLayerFilterChange = (nextLayerFilter: string) => {
    setLayerFilter(nextLayerFilter);
    if (nextLayerFilter === 'all') return;

    const rowId = rowIdByLayerId.get(nextLayerFilter);
    if (rowId) handleSelectRow(rowId);
  };

  useEffect(() => {
    const shellElement = graphShellRef.current;
    const graphElement = shellElement?.querySelector<HTMLElement>('[data-testid="layer-cake-graph"]');
    if (!graphElement) return;

    let frame = 0;
    const updateGraphHeight = () => {
      const nextHeight = Math.round(graphElement.getBoundingClientRect().height);
      if (nextHeight <= 0) return;

      setGraphHeight((currentHeight) =>
        currentHeight === null || Math.abs(currentHeight - nextHeight) > 1 ? nextHeight : currentHeight,
      );
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateGraphHeight);
    };

    updateGraphHeight();
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(graphElement);
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const mapGridStyle = {
    '--map-panel-height': graphHeight ? `${graphHeight}px` : undefined,
  } as CSSProperties & { '--map-panel-height'?: string };

  return (
    <div className="relative z-10 mx-auto max-w-[1580px] px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <section className="relative z-30 rounded-[24px] border border-[#d2d2d7]/85 bg-white/86 p-3 shadow-[0_18px_52px_rgba(29,29,31,0.06)] backdrop-blur-xl">
        <div className="map-page-filter-bar__inner">
          <div className="map-page-filter-main">
            <LayerFilterListbox options={layerFilterOptions} value={layerFilter} onChange={handleLayerFilterChange} />
            <div className="inline-flex min-w-0 items-center gap-2 text-sm text-[#6e6e73]">
              <Network className="h-4 w-4 shrink-0 text-[#0071e3]" />
              <span className="truncate">
                {selectedLayerLabel} · {visibleCompanies.length} 家公司
              </span>
            </div>
          </div>
          <div className="map-page-filter-actions">
            <DemoDataNotice compact />
            <span className="hidden rounded-full border border-[#d2d2d7] bg-[#fbfbfd] px-4 py-2 text-xs font-medium text-[#86868b] sm:inline-flex">
              点击层级或公司，右侧面板同步切换
            </span>
          </div>
        </div>
      </section>

      <section className="map-page-main-grid mt-5" style={mapGridStyle}>
        <div ref={graphShellRef} className="min-w-0">
          <LayerCakeGraph
            mode={mode}
            variant="map"
            selectedRowId={selectedLayerRow?.id}
            selectedCompanyId={selectedCompany?.id}
            onSelectRow={handleSelectRow}
            onSelectLayer={handleSelectLayer}
            onSelectCompany={handleSelectCompany}
          />
        </div>

        <aside className="map-page-side-panel flex flex-col overflow-hidden rounded-[28px] border border-[#cfd9e8] bg-white/92 shadow-[0_26px_70px_rgba(29,29,31,0.10)] backdrop-blur-xl">
          <div className="map-page-detail-section border-b border-[#d2d2d7]/75 p-5">
            {selectedCompany ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8d8d93]">Selected Node</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#1d1d1f]">公司详情</h2>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d2d2d7] bg-[#fbfbfd] text-[#0071e3]">
                    <Building2 className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-5 rounded-2xl border border-[#d2d2d7] bg-[#fbfbfd] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#d2d2d7] bg-white font-mono text-xs font-semibold text-[#6e6e73]">
                      {selectedCompany.logo}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-[#1d1d1f]">{selectedCompany.name.zh}</p>
                      <p className="truncate text-sm text-[#86868b]">
                        {displayCountry(selectedCompany.basicInfo.country)} · {companyTypeLabel[selectedCompany.basicInfo.type]}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#515154]">{selectedCompany.aiBusiness.strategicPosition.zh}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCompany.aiBusiness.layerIds.map((id) => (
                    <Badge key={id}>{layerNameById.get(id) ?? id}</Badge>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ['相关节点', `${connected?.directIds.length ?? 0}`],
                    ['覆盖层数', `${selectedCompany.aiBusiness.layerIds.length}`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                      <p className="text-sm text-[#86868b]">{label}</p>
                      <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{value}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/companies/${selectedCompany.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2 text-sm font-semibold text-[#fbfbfd] transition hover:-translate-y-0.5 hover:bg-[#2f2f32]"
                >
                  进入公司详情
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8d8d93]">Explore Panel</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#1d1d1f]">当前层级</h2>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d2d2d7] bg-[#fbfbfd] text-[#0071e3]">
                    <Layers3 className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-5 rounded-2xl border border-[#d2d2d7] bg-[#fbfbfd] p-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-2xl font-semibold leading-tight text-[#1d1d1f]">{selectedLayerDetail?.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8d8d93]">{selectedLayerRow?.enTitle}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#515154]">{selectedLayerRow?.thesis}</p>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ['这一层做什么', selectedLayerDetail?.does],
                    ['在 AI 领域承担的角色', selectedLayerDetail?.role],
                    ['与上层的直接关系', selectedLayerDetail?.upperRelation],
                    ['与下层的直接关系', selectedLayerDetail?.lowerRelation],
                    ['为什么重要', selectedLayerDetail?.importance],
                    ['观察杠杆', selectedLayerDetail?.leverage],
                  ].map(([label, value]) => (
                    <section key={label}>
                      <h4 className="text-sm font-semibold text-[#86868b]">{label}</h4>
                      <p className="mt-1 text-sm leading-7 text-[#3f3f46]">{value}</p>
                    </section>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedLayerRow?.layers.map((layer) => <Badge key={layer.id}>{layer.name.zh}</Badge>)}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ['覆盖公司', `${selectedLayerRow?.companies.length ?? 0}`],
                    ['细分层', `${selectedLayerRow?.layers.length ?? 0}`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                      <p className="text-sm text-[#86868b]">{label}</p>
                      <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-[#d2d2d7]/75 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8d8d93]">Node Switcher</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#1d1d1f]">{selectedLayerDetail?.title ?? ''}代表公司</h2>
                </div>
                <span className="text-sm font-medium text-[#86868b]">
                  {filteredCompanies.length}/{representativeCompanies.length}
                </span>
              </div>
              <label className="relative mt-5 block">
                <span className="sr-only">搜索代表公司、产品或层级</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8d8d93]" />
                <input
                  value={companyQuery}
                  onChange={(event) => setCompanyQuery(event.target.value)}
                  placeholder="搜索代表公司、产品或层级"
                  className="h-12 w-full rounded-full border border-[#d2d2d7] bg-[#fbfbfd] pl-12 pr-4 text-sm text-[#1d1d1f] outline-none transition placeholder:text-[#9b9ba1] focus:border-[#8bbdff] focus:ring-2 focus:ring-[#0071e3]/15"
                />
              </label>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {panelCompanies.map((company) => {
                  const active = selectedCompany?.id === company.id;

                  return (
                    <button
                      key={company.id}
                      type="button"
                      onClick={() => handleSelectCompany(company.id)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        active
                          ? 'border-[#8bbdff] bg-[#eef6ff] shadow-[0_14px_34px_rgba(0,113,227,0.12)]'
                          : 'border-[#d2d2d7]/85 bg-white hover:border-[#8bbdff] hover:bg-[#fbfbfd]'
                      }`}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#d2d2d7] bg-[#fbfbfd] font-mono text-xs font-semibold text-[#6e6e73]">
                        {company.logo}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-base font-semibold text-[#1d1d1f]">{company.name.zh}</span>
                        <span className="mt-1 block truncate text-sm text-[#6e6e73]">
                          {displayTerms(company.aiBusiness.coreProducts.slice(0, 2))}
                        </span>
                      </span>
                      {active ? <Check className="h-4 w-4 shrink-0 text-[#0071e3]" /> : null}
                    </button>
                  );
                })}
                {panelCompanies.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#d2d2d7] bg-[#fbfbfd] p-6 text-center text-sm leading-6 text-[#86868b]">
                    没有匹配的公司，换个关键词试试。
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          ['当前筛选', selectedLayerLabel],
          ['可见节点', `${visibleCompanies.length} 家公司`],
          ['当前选择', selectedLabel],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[22px] border border-[#d2d2d7]/80 bg-white/84 p-5 shadow-[0_18px_48px_rgba(29,29,31,0.05)] backdrop-blur-xl">
            <p className="text-sm font-semibold text-[#86868b]">{label}</p>
            <p className="mt-2 truncate text-xl font-semibold text-[#1d1d1f]">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
