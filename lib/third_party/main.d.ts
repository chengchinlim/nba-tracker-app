import { type PlayerStatsPerGame } from '../types/third_party/player_stats_per_game';
export declare const getPlayerStatsData: (params: {
    season: number;
    team: number;
}) => Promise<PlayerStatsPerGame[]>;
