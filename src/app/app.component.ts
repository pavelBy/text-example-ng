import { Component, ViewChild, ElementRef } from '@angular/core';
import gojs from 'gojs';

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
    const mapChildAndParent = {};

    const nodesTree = queryNodes.reduce((acc, node) => {
      const parseNode = node.trim().split('->');
      const parent = parseNode[0].trim();
      const children = parseNode[1].length > 1 ? parseNode[1].split(',').map(child => child.trim()) : parseNode[1];

      const addDataToTree = () => {
        return children.reduce((accChield, child) => {
          accChield[child] = null;
          mapChildAndParent[child] = parent;
          return accChield;
        }, {});
      };

      if (mapChildAndParent[parent]) {
        const firstLevelParent = mapChildAndParent[parent];
        const twoLevelParent = mapChildAndParent[firstLevelParent];
        if (twoLevelParent) {
          acc[twoLevelParent][firstLevelParent][parent] = addDataToTree();
        } else {
          acc[firstLevelParent][parent] = addDataToTree();
        }
      } else if (Object.keys(acc).length === 0 || !mapChildAndParent[parent]) {
        acc[parent] = addDataToTree();
      }

      return acc;
    }, {});

    console.log(nodesTree);
  }
}
