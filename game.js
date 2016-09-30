'use strict';

function Shulte(selector){
    console.log('creating new scene');

    this.selector = selector;

    this.snap = Snap(selector);

    this.size = 5;
    this.cellPadding = 10;
    this.cellBorderWidth = 2;
    this.cellBorderColor = 'silver';
    this.cellBorderRadius = 10;
    this.cellBgColor  = 'white';
    this.cellClickedColor = '#9ef09e';
    this.cellFontColor = '#717171';


    this.cells = [];

    window.snap = this.snap;

}


Shulte.prototype.start = function(){
    console.log('starting new game');

    var shulte = this;

    snap.clear();
    this.cells.slice(0,this.cells.length-1);

    var tbWidth = this.snap.node.getBoundingClientRect().width - parseInt(getComputedStyle(this.snap.node)["border-left-width"]) * 2;

    console.log('table width:', tbWidth);

    var cellWidth = (tbWidth - this.cellPadding ) / this.size - this.cellPadding;

    var fontSize = cellWidth / 2;



    var tmp = [];
    this.numbers = [];
    for(let i=1; i <= this.size*this.size; i++)
        tmp.push(i);
    for(let i=0; i < this.size*this.size; i++){
        let index = Math.floor(Math.random()*tmp.length)
        this.numbers.push( tmp.splice( index, 1 )[0] );
    }
    this.nextNumber = 1;



    for( let row = 0; row < this.size; row++ ){
        for( let col = 0; col < this.size; col++ ){
            let x = ( cellWidth + this.cellPadding ) * col + this.cellPadding;
            let y = ( cellWidth + this.cellPadding ) * row + this.cellPadding;

            let cell = this.snap.rect(x,y,cellWidth,cellWidth);
            cell.attr({
                fill: this.cellBgColor,
                stroke: this.cellBorderColor,
                strokeWidth: this.cellBorderWidth,
                rx: "1%",
                ry: "1%"
            });

            cell.number = this.numbers[ this.size*row + col];
            cell.text = snap.text( x,y, cell.number );
            cell.text.attr({
                x: x + cellWidth / 2,
                y: y + cellWidth / 2 + fontSize/3 ,
                fontSize: fontSize,
                textAnchor: 'middle',
                fill: this.cellFontColor,
                cursor: 'default'

            });

            cell.mousedown( this.cellClicked.bind(this,cell) );
            cell.text.mousedown( this.cellClicked.bind(this,cell) );

            this.cells.push(cell);

        }
    }




}

Shulte.prototype.cellClicked = function( cell ){
    if( cell.number !== this.nextNumber )
        return;
    cell.attr({
        fill: this.cellClickedColor
    })
    cell.animate({
        fill: this.cellBgColor
    }, 500 );

    this.nextNumber++;

    if( this.nextNumber > this.size*this.size ){
        console.log('---DONE---')
        for( cell of this.cells ){
            cell.text.attr( {text: ":)"} );
        }
    }
}
