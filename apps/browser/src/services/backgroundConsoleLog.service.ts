import { LogService as AbstractLogService } from "jslib-common/abstractions/log.service";
import { LogLevelType } from "jslib-common/enums/logLevelType";

export class BackgroundConsoleLogService implements AbstractLogService {
  debug(message: string) {
    console.debug(message);
  }

  info(message: string) {
    console.log(message);
  }

  warning(message: string) {
    console.warn(message);
  }

  error(message: string) {
    console.error(message);
  }

  write(level: LogLevelType, message: string) {
    switch (level) {
      case LogLevelType.Debug:
        // eslint-disable-next-line
        console.log(message);
        break;
      case LogLevelType.Info:
        // eslint-disable-next-line
        console.log(message);
        break;
      case LogLevelType.Warning:
        // eslint-disable-next-line
        console.warn(message);
        break;
      case LogLevelType.Error:
        // eslint-disable-next-line
        console.error(message);
        break;
      default:
        break;
    }
  }

  time: (label: string) => void;
  timeEnd: (label: string) => [number, number];
}
