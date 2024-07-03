// @flow

export default function serialize(obj) {

  const serializedDoc = [];

  for (const [key, entry] of Object.entries(obj)) {
    const description = typeof entry === 'object' ? entry.description : null;
    const value = typeof entry === 'object' ? entry.value : entry;

    let serializedEntry = '';

    if (description) {
      const descriptionLines = description.split('\n');
      for (const line of descriptionLines) {
        serializedEntry += `# ${line}\n`;
      }
    }

    serializedEntry += `${key}=${serializeString(value)}`;

    serializedDoc.push(serializedEntry);
  }

  return serializedDoc.join('\n');
}

function serializeString(val) {
  if (val.includes('\n') && !val.includes("'")) {
    return `'${val}'`;
  }
  return JSON.stringify(val)
}
