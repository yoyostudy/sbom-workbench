import { ExportComponentData } from '../../../model/interfaces/report/ExportComponentData';
import { DecisionData } from '../../../model/interfaces/report/DecisionData';
import { ComponentVulnerability } from '../../../model/entity/ComponentVulnerability';
import { LicenseDTO } from '../../../../api/dto';
import { ExportCryptographyData } from '../../../model/interfaces/report/ExportCryptographyData';

export interface ExportRepository {
  getIdentifiedData(): Promise<ExportComponentData[]>;
  getDetectedData(): Promise<ExportComponentData[]>;
  getRawData();
  getWfpData(): Promise<string>;
  getDecisionData(): Promise<Array<DecisionData>>;
  getDetectedVulnerability(): Promise<Array<ComponentVulnerability>>;
  getIdentifiedVulnerability(): Promise<Array<ComponentVulnerability>>;
  getAllLicensesWithFullText(): Promise<Array<LicenseDTO>>; // TODO:Change type
  getCBOMDetectedData(): Promise<ExportCryptographyData>;
  getCBOMIdentifiedData(): Promise<ExportCryptographyData>;
}
