export abstract class BaseEntity {
  protected constructor(
    protected readonly id: string,
    protected readonly createdAt: Date,
    protected updatedAt: Date,
  ) {}
}
