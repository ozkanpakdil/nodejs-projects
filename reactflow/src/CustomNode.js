import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
  return (
    <div>
      {data.label}
      <Handle type="target" position={Position.Top} id="a1" className='simple-floatingedges' />
      <Handle type="target" position={Position.Top} id="a2" />
      <Handle type="target" position={Position.Bottom} id="b1" />
      <Handle type="target" position={Position.Bottom} id="b2" />
    </div>
  );
});
