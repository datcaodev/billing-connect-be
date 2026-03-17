export class BaseModel {
  protected async executeQuery<T>(
    handleRequest: () => Promise<T>
  ): Promise<T> {
    try {
      return await handleRequest();
    } catch (error) {
      throw `${error} in ${this.constructor.name}`;
    }
  }
}