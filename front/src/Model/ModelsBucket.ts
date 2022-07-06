export default class ModelsBucket<T extends { id: number }> {
    protected models: T[] = [];

    fill (models: T[]) {
        this.models = models;
    }

    push (model: T) {
        this.models.push(model);
    }

    get (): T[] {
        return this.models;
    }

    getById (id: number): T | null {
        return this.models
            .find((model: T): boolean => model.id === id) ?? null;
    }

    flush (): void {
        this.models.splice(0, this.models.length);
    }
}
