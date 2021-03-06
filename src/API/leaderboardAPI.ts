import { instance, RATING_FIELD_NAME, TEAM_NAME } from './API';

export interface ILeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface IUserScore {
  score: number;
  userId: number;
}

export interface IUserScoreData {
  data: IUserScore;
}

export const getLeaderboard = async (leaderboardRequest: ILeaderboardRequest): Promise<IUserScoreData[]> => {
  const response = await instance.post(`leaderboard/${TEAM_NAME}`, leaderboardRequest);

  return response.data;
};

// eslint-disable-next-line max-len
export const getLeaderboardSSR = async (leaderboardRequest: ILeaderboardRequest, cookie: string): Promise<IUserScoreData[]> => {
  const response = await instance.post(`leaderboard/${TEAM_NAME}`, leaderboardRequest, {
    headers: { Cookie: cookie }
  });

  return response.data;
};

export const addUserToLeaderboard = async (userScore: IUserScore): Promise<string> => {
  const response = await instance.post(
    'leaderboard',
    { data: userScore, ratingFieldName: RATING_FIELD_NAME, teamName: TEAM_NAME }
  );

  return response.data;
};
