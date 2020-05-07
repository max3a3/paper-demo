import HTML5Backend from 'react-dnd-html5-backend/lib/HTML5Backend';

export default class HTML5BackendExt extends HTML5Backend {
  constructor(manager, globalContext) {

    super(manager,globalContext)

    this.superHandleTopDragEnter = this.handleTopDragEnter
    let _this = this
    this.handleTopDragEnter = function(e) {
      _this.superHandleTopDragEnter(e)
    }
  }

  /*handleTopDragEnter=  (e) =>{
    HTML5Backend.handleTopDragEnter(e)
  }*/
}
