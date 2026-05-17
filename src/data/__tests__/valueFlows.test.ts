import { describe, expect, it } from 'vitest';
import { valueFlowPathViews, valueFlowScenarios } from '../value-flows';

describe('normalized value-flow scenarios', () => {
  it('models each scenario as a balanced 100-unit allocation instead of mixed demo dollars', () => {
    expect(valueFlowScenarios.length).toBeGreaterThanOrEqual(3);

    valueFlowScenarios.forEach((scenario) => {
      const rootOutflow = scenario.links
        .filter((link) => link.source === scenario.rootNodeId)
        .reduce((total, link) => total + link.value, 0);

      expect(scenario.unit).toBe('标准化价值单位');
      expect(scenario.basisValue).toBe(100);
      expect(rootOutflow).toBe(100);
      expect(JSON.stringify(scenario)).not.toContain('demo $B');

      const nodeIds = new Set(scenario.nodes.map((node) => node.id));
      const terminalNodeIds = new Set(scenario.nodes.filter((node) => node.role === 'terminal').map((node) => node.id));

      scenario.links.forEach((link) => {
        expect(nodeIds.has(link.source)).toBe(true);
        expect(nodeIds.has(link.target)).toBe(true);
        expect(link.value).toBeGreaterThan(0);
      });

      scenario.nodes.forEach((node) => {
        if (node.id === scenario.rootNodeId || terminalNodeIds.has(node.id)) return;

        const inflow = scenario.links.filter((link) => link.target === node.id).reduce((total, link) => total + link.value, 0);
        const outflow = scenario.links.filter((link) => link.source === node.id).reduce((total, link) => total + link.value, 0);

        if (outflow > 0) expect(outflow).toBe(inflow);
      });
    });
  });

  it('keeps the previous broad value-chain topology as path-strength views', () => {
    expect(valueFlowPathViews.length).toBeGreaterThanOrEqual(4);

    valueFlowPathViews.forEach((view) => {
      expect(view.unit).toBe('路径强度指数');
      expect(view.links.length).toBeGreaterThan(0);
      expect(JSON.stringify(view)).not.toContain('demo $B');
      expect(JSON.stringify(view)).not.toContain('$B');

      view.links.forEach((link) => {
        expect(link.value).toBeGreaterThan(0);
        expect(link.source).not.toBe(link.target);
        expect(link.sourceLabel.length).toBeGreaterThan(0);
        expect(link.targetLabel.length).toBeGreaterThan(0);
        expect((link as typeof link & { evidence?: string }).evidence).toBeTruthy();
        expect((link as typeof link & { confidence?: string }).confidence).toBeTruthy();
      });
    });

    const allPaths = valueFlowPathViews.find((view) => view.id === 'economic-map');
    expect(allPaths?.links.length).toBeGreaterThanOrEqual(40);

    const pathSet = new Set(allPaths?.links.map((link) => `${link.source}->${link.target}`));
    expect(pathSet.has('ai-applications->ai-infra-agent-framework')).toBe(true);
    expect(pathSet.has('ai-infra-agent-framework->foundation-models')).toBe(true);
    expect(pathSet.has('foundation-models->cloud-platform')).toBe(true);
    expect(pathSet.has('cloud-platform->servers-networking')).toBe(true);
    expect(pathSet.has('servers-networking->chip-design')).toBe(true);
  });
});
