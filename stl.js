const readHeader = (buf) => {
  return buf.slice(0, 79);
};

const readTriangleCount = (buf) => {
  return buf.readUInt32LE(79); 
};

const readTriangles = (buf) => {
  return buf.slice(83, buf.length - 1);
};

const readAttributeByteCount = (buf) => {
  return buf.slice(buf.length - 1, buf.length + 1);
};

module.exports.merge = (buffers) => {
  const headerForFirst = readHeader(buffers[0]);

  const triangleCount = buffers.reduce((sum, value) => {
    return sum + readTriangleCount(value);
  }, 0);

  const triangles = buffers.map(buf => {
    return readTriangles(buf);
  });

  const attributeByteCount = readAttributeByteCount(buffers[0]);
 
  const triangleCountBuffer = Buffer.allocUnsafe(4);
  triangleCountBuffer.writeUInt32LE(triangleCount, 0);

  const allBuffers = [headerForFirst, triangleCountBuffer].concat(triangles)
                                                          .concat(attributeByteCount);
  
  return Buffer.concat(allBuffers);
};