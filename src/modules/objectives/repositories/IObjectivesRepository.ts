interface IObjectivesRepository {
  create(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  edit(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  delete(group_id: number): Promise<void>;
}
export { IObjectivesRepository };
