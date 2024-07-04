export interface IRace {
    id: string;
    name: string,
    state?: IRaceState,
    child?: IRace[]
}

export interface IRaceState {
    strength?: number,
    agility?: number,
    physique?: number,
    intelligence?: number,
    wisdom?: number,
    charisma?: number,
    additional_points?: number[],
}
