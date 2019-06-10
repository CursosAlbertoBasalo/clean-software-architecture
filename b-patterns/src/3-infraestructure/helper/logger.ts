import { Checker } from './checker';
import { Printer } from './printer';
export class Logger {
  private readonly logFileName = `log.txt`;
  private readonly checker = new Checker();
  public print( logContent : string ) {
    if ( this.checker.hasStringContent( logContent ) ) {
      Printer.printContentToFile( { fileName: this.logFileName, textContent: logContent } );
    }
  }
}
