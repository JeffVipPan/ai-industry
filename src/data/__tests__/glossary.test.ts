import { describe, expect, it } from 'vitest';
import { getGlossaryDefinition, getGlossaryEntry, technologyGlossary } from '../glossary';
import { layers } from '../layers';

describe('technology glossary', () => {
  it('defines every layer core technology', () => {
    const coreTechnologies = [...new Set(layers.flatMap((layer) => layer.coreTechnologies))];
    const missingDefinitions = coreTechnologies.filter((technology) => !getGlossaryDefinition(technology));

    expect(coreTechnologies).toHaveLength(74);
    expect(missingDefinitions).toEqual([]);
  });

  it('returns stable display labels and Chinese definitions', () => {
    expect(getGlossaryEntry('GPU architecture')).toMatchObject({
      term: 'GPU architecture',
      label: 'GPU 架构',
    });
    expect(getGlossaryDefinition('GPU architecture')).toContain('并行计算');
    expect(getGlossaryDefinition('cuda ecosystem')).toContain('软件生态');
    expect(Object.keys(technologyGlossary)).toContain('CUDA ecosystem');
  });
});
