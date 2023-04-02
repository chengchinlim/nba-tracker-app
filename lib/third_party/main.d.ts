import { type PlayerStatsPerGame } from './types/player_stats_per_game';
import { type PlayerData } from './types/player_data';
export declare const getPlayerStatsData: (params: {
    season: number;
    team: number;
}) => Promise<PlayerStatsPerGame[]>;
export declare const getPlayersData: (params: {
    season: number;
    team: number;
}) => Promise<PlayerData[]>;
