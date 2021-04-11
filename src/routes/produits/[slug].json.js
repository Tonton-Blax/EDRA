import YAML from 'yaml'
import fs from 'fs';


export async function get(req, res) {

    const { slug } = req.params;

    console.log(slug);
 
    const content = fs.readFileSync(`static/produits/${slug}.md`, 'utf8').toString()
    if (content) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
       });
        res.end( JSON.stringify( YAML.parseAllDocuments(content)[0] ) );
    }
    else {
		res.status(404).send(new Error('lol'));
	}
}