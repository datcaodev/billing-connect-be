export class BaseRespository {
  protected async handleWithTryCatch<T>(
    handleRequest: () => Promise<T>
  ): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await handleRequest();
    } catch (error) {
      throw error;
    }
  }
}