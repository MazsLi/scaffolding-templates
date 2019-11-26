import React, { useState, useEffect, useRef } from 'react';
import { Steps, Popover, Card, Empty, Icon } from 'antd';
import G6 from '@antv/g6';
import { queryData, getReactAttribute } from './utils';
import qs from 'qs';

const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red'
  },
  children: [{
    id: 'SubTreeNode1',
    raw: {},
    children: [{
      id: 'SubTreeNode1.1'
    }, {
      id: 'SubTreeNode1.2',
      children: [{
        id: 'SubTreeNode1.2.1'
      }, {
        id: 'SubTreeNode1.2.2'
      }, {
        id: 'SubTreeNode1.2.3'
      }]
    }]
  }, {
    id: 'SubTreeNode2',
    children: [{
      id: 'SubTreeNode2.1'
    }]
  }, {
    id: 'SubTreeNode3',
    children: [{
      id: 'SubTreeNode3.1'
    }, {
      id: 'SubTreeNode3.2'
    }, {
      id: 'SubTreeNode3.3'
    }]
  }, {
    id: 'SubTreeNode4'
  }, {
    id: 'SubTreeNode5'
  }, {
    id: 'SubTreeNode6'
  }, {
    id: 'SubTreeNode7'
  }, {
    id: 'SubTreeNode8'
  }, {
    id: 'SubTreeNode9'
  }, {
    id: 'SubTreeNode10'
  }, {
    id: 'SubTreeNode11'
  }]
};

const Path = props => {
  const ref = useRef(null);

  const { name, queryArgs, style } = getReactAttribute(props);
  const [ width, height ] = [ 1000, 600 ];
  
  const initGraph = () => {
    const graph = new G6.TreeGraph({
      container: ref.current,
      width,
      height,
      pixelRatio: 2,
      linkCenter: true,
      modes: {
        default: [{
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
          }
        }, 'drag-canvas', 'zoom-canvas' ]
      },
      defaultNode: {
        shape: 'rect',
        labelCfg: {
          style: {
            fill: '#000000A6',
            fontSize: 10
          }
        },
        style: {
          stroke: '#72CC4A',
          width: 100
        }
      },
      defaultEdge: {
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        }
      }
    });
    
    graph.node(function(node) {
      return {
        size: 16,
        anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        },
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : 'right',
          offset: 5
        }
      };
    });
    let i = 0;
    graph.edge(function() {
      i++;
      return {
        shape: 'cubic-horizontal',
        color: '#A3B1BF',
        label: i
      };
    });
    
    graph.data(data);
    graph.render();
    graph.fitView();
  }

  useEffect(() => {
    initGraph();
  }, []);

  return (
    <Card style={{ width: '100%', ...style }} title={name}>
      <div ref={ref}></div>
    </Card>
  );
}

export default Path;