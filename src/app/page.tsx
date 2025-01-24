import Container from './container';
import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/songs.json', 'utf8');
  const data = JSON.parse(file);
  

  return (
   <Container 
   data={data}/>
  );
}
