import { HttpService } from './HttpService'
import DataItem from '../dto/data-item'

class ExperimentService {
  //CURRENTLY USING REST SERVICE TO MAKE API CALLS
  //TODO: make grpc calls instead when grpc endpoint for experiments is ready
  private httpService = new HttpService({
    baseURL: 'http://localhost:18280'
  })

  public async getAllExperiments(): Promise<DataItem[]> {
    const response = await this.httpService.get<DataItem[]>('/experiments')
    return response.data
  }

  public async getExperiment(id: number): Promise<DataItem> {
    const response = await this.httpService.get<DataItem>(`/experiment/${id}`)
    return response.data
  }

  public async createExperiment(experiment: DataItem): Promise<DataItem> {
    const response = await this.httpService.post<DataItem, DataItem>('/experiment', experiment)
    return response.data
  }

  public async updateExperiment(experiment: DataItem): Promise<DataItem> {
    const response = await this.httpService.update<DataItem, DataItem>(`/experiment/${experiment.id}`, experiment)
    return response.data
  }
}
export default new ExperimentService()
