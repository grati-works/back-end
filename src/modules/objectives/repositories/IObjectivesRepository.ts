interface IObjectivesRepository {
  create(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  edit(
    id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  delete(id: number): Promise<void>;
}
export { IObjectivesRepository };
