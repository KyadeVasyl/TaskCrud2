export interface AlertState {
  status: boolean;
  message: string;
}

export interface ComponentInter {
  state: AlertState;
  message?: string | null;
  handleBack: Function;
}
