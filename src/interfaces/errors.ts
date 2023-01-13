export interface GetVolumeError {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      domain: string;
      reason: string;
    };
  }[];
}
