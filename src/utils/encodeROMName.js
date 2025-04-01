
const encodeROMName = (name, version, projectName) => {
    let parts = [name];
  
    if (version) {
      parts.push(version);
    }
  
    if (projectName) {
      parts.push(projectName);
    }
  
    return parts.join('-')
      .toLowerCase()
      .replace(/[\s()]+/g, '-') 
      .replace(/-+/g, '-')     
  };
  
  export { encodeROMName }; 