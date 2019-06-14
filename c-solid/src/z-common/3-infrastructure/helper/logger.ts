import { ILogger } from '../models/i-logger';
import { Checker } from './checker';
import { Printer } from './printer';

export class Logger implements ILogger {
  private readonly logFileName = `log.txt`;
  private readonly checker = new Checker();
  public printLog( logContent: string ) {
    if ( this.checker.hasStringContent( logContent ) ) {
      Printer.printContentToFile( { fileName: this.logFileName, textContent: logContent } );
    }
  }
}
