import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('querycli') querycli: ElementRef;

  onClick() {
    const queryCliValue = this.querycli.nativeElement.value;

    if (!queryCliValue) {
      return false;
    }

    const queryNodes = queryCliValue.split('\n');

    const nodesTree = queryNodes.reduce((acc, node) => {
      const parseNode = node.trim().split('->');
      const parent = parseNode[0].trim();
      const children = parseNode[1].length > 1 ? parseNode[1].split(',').map(child => child.trim()) : parseNode[1];

      const addChildren = () => {
        return children.reduce((accChield, child) => {
          accChield[child] = null;
          return accChield;
        }, {});
      };

      const searchNesting = (obj) => {
        Object.keys(obj).forEach(function(key) {
          if (obj[key][parent] === null) {
            obj[key][parent] = addChildren();
          } else {
            searchNesting(obj)
          }
        });
      }; 

      if (Object.keys(acc).length === 0) {
        acc[parent] = addChildren();
      } else {
        searchNesting(acc)

        return acc;
      } 

      return acc;
    }, {});

    console.log(nodesTree);
  }
}
