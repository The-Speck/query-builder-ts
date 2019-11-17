export class ConditionNotFound extends Error {
  constructor(condition: string, id: string) {
    const message = `${condition} with ${id} was not found`;
    super(message);
    this.name = 'ConditionNotFound';
  }
}

export default ConditionNotFound;
