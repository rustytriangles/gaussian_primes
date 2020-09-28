import React from 'react';
import './App.css';
import {Gaussian} from './gaussian.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sx: 7,
            sy: -8,
            scale: 12,
        };
    }

    onclick(e) {
        const bbox = e.target.getBBox();
        const sx = ((bbox.x + bbox.width/2) - 500) / this.state.scale;
        const sy = ((bbox.y + bbox.height/2) - 480) / this.state.scale;
        this.setState((prevState) => {
            return {sx: sx,
                    sy: sy,
                    scale: prevState.scale
                   }
        });
    }

    getPrimePoints(xmin, ymin, xmax, ymax, cx, cy, scale) {
        let points = [];
        for (let i=xmin; i<=xmax; i++) {
            for (let j=ymin; j<=ymax; j++) {
                if (new Gaussian(i,j).isPrime()) {
                    points.push([cx + scale*i, cy + scale*j]);
                }
            }
        }
        return points;
    }

    getPath(sx, sy, cx, cy, scale) {
        const start_pt = new Gaussian(sx, sy);

        let curr_pt = new Gaussian(start_pt);
        let curr_dir = new Gaussian(1,0);
        let points = [[cx + scale*curr_pt.x, cy + scale*curr_pt.y]];
        do {
            curr_pt = curr_pt.add(curr_dir);
            points.push([cx + scale*curr_pt.x, cy + scale*curr_pt.y]);
            if (curr_pt.isPrime()) {
                curr_dir = curr_dir.multiply(new Gaussian(0,1));
            }
        } while(!curr_pt.equalTo(start_pt));


        let path_data = '';
        for (let i=0; i<points.length; i++) {
            path_data += (i===0?' M':' L');
            path_data += ' ' + points[i][0] + ' ' + points[i][1];
        }

        const props = {
            fillStyle: "none",
            strokeColor: "grey",
            strokeWidth: "2"
        };

        return <path fill={props.fillStyle}
                     stroke={props.strokeColor}
                     stroke-width={props.strokeWidth}
                     d={path_data} />
    }

    render() {
        const fun = (items) => items.map((item) => {
            const x = item[0];
            const y = item[1];
            const rad = 5;
            return <circle cx={x} cy={y} r={rad} onClick={ this.onclick.bind(this)} />
        })

        const w = 1000;
        const h = 960;
        const prime_points = this.getPrimePoints(-50,-50, 50, 70, w/2, h/2, this.state.scale);
        const path = this.getPath(this.state.sx, this.state.sy, w/2, h/2, this.state.scale);
        const box = [0, 0, w, h];
        return (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width={w/2} height={h/2} viewBox={box}>
                <g fill="#FF00FF">
                    {path}
                    <> {fun(prime_points)} </>
                </g>
            </svg>
                <h3>Starting Point: {this.state.sx} + {this.state.sy} <em>i</em></h3>
            </>
        );
    }
}

export default App;
