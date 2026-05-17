import type { FlagshipData } from './types';
import { aseFlagship } from './ase';
import { awsFlagship } from './aws';
import { googleCloudFlagship } from './google-cloud';
import { mapFeaturedFlagships } from './map-featured';
import { micronFlagship } from './micron';
import { microsoftAzureFlagship } from './microsoft-azure';
import { nvidiaFlagship } from './nvidia';
import { openaiFlagship } from './openai';
import { oracleCloudFlagship } from './oracle-cloud';
import { samsungMemoryFlagship } from './samsung-memory';
import { skHynixFlagship } from './sk-hynix';
import { tsmcFlagship } from './tsmc';

const flagshipById: Record<string, FlagshipData> = {
  ...mapFeaturedFlagships,
  [aseFlagship.companyId]: aseFlagship,
  [awsFlagship.companyId]: awsFlagship,
  [googleCloudFlagship.companyId]: googleCloudFlagship,
  [micronFlagship.companyId]: micronFlagship,
  [microsoftAzureFlagship.companyId]: microsoftAzureFlagship,
  [nvidiaFlagship.companyId]: nvidiaFlagship,
  [openaiFlagship.companyId]: openaiFlagship,
  [oracleCloudFlagship.companyId]: oracleCloudFlagship,
  [samsungMemoryFlagship.companyId]: samsungMemoryFlagship,
  [skHynixFlagship.companyId]: skHynixFlagship,
  [tsmcFlagship.companyId]: tsmcFlagship,
};

export const getFlagshipData = (companyId: string): FlagshipData | undefined => flagshipById[companyId];

export const flagshipCompanyIds = Object.keys(flagshipById);

export type {
  FlagshipData,
  FlagshipSource,
  FlagshipKeyDependency,
  FlagshipChinaPeer,
  FlagshipChinaComparison,
  FlagshipResearchNote,
} from './types';
