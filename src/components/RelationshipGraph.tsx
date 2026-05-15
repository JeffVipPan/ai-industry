import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react';
import { useMemo } from 'react';
import { companies, getCompanyById } from '../data/companies';
import { getLayerById, layers } from '../data/layers';
import { relationships } from '../data/relationships';
import { findConnectedNodeIds } from '../data/selectors';
import { relationshipTypeLabel } from '../lib/labels';
import type { EntityRef } from '../types/common';

const labelFor = (ref: EntityRef) => {
  if (ref.type === 'company') return getCompanyById(ref.id)?.name.en ?? ref.id;
  return getLayerById(ref.id)?.name.zh ?? ref.id;
};

export const RelationshipGraph = ({ target, dense = false }: { target?: EntityRef; dense?: boolean }) => {
  const { nodes, edges } = useMemo(() => {
    const sourceRelationships = target
      ? findConnectedNodeIds(target.type, target.id, relationships).edges.slice(0, dense ? 44 : 18)
      : relationships.filter((relationship) => relationship.from.type === 'layer' || relationship.to.type === 'layer').slice(0, 42);
    const refs = new Map<string, EntityRef>();
    sourceRelationships.forEach((relationship) => {
      refs.set(`${relationship.from.type}:${relationship.from.id}`, relationship.from);
      refs.set(`${relationship.to.type}:${relationship.to.id}`, relationship.to);
    });
    if (target) refs.set(`${target.type}:${target.id}`, target);

    const graphNodes: Node[] = Array.from(refs.values()).map((ref, index) => {
      const isTarget = target?.id === ref.id && target.type === ref.type;
      const layer = ref.type === 'layer' ? getLayerById(ref.id) : layers.find((item) => getCompanyById(ref.id)?.aiBusiness.layerIds.includes(item.id));
      const angle = (index / Math.max(refs.size, 1)) * Math.PI * 2;
      const radius = isTarget ? 0 : dense ? 330 : 230;
      return {
        id: `${ref.type}:${ref.id}`,
        data: { label: labelFor(ref) },
        position: {
          x: isTarget ? 420 : 420 + Math.cos(angle) * radius,
          y: isTarget ? 240 : 240 + Math.sin(angle) * radius * 0.65,
        },
        style: {
          borderColor: isTarget ? '#22d3ee' : 'rgba(148,163,184,0.25)',
          boxShadow: isTarget ? '0 0 24px rgba(34,211,238,.32)' : undefined,
          background: ref.type === 'layer' ? `${layer?.visualIdentity.color}1A` : 'rgba(2,6,23,.86)',
        },
      };
    });

    const graphEdges: Edge[] = sourceRelationships.map((relationship) => ({
      id: relationship.id,
      source: `${relationship.from.type}:${relationship.from.id}`,
      target: `${relationship.to.type}:${relationship.to.id}`,
      label: relationshipTypeLabel[relationship.type],
      animated: relationship.strength >= 4,
      style: { strokeWidth: 1 + relationship.strength / 2 },
    }));

    return { nodes: graphNodes, edges: graphEdges };
  }, [dense, target]);

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border border-slate-700/30 bg-slate-950/35">
      <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
        <Background color="rgba(34,211,238,.18)" gap={24} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};
