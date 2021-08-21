import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('paul');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
    setIsPending(false);
    history.push('/');
})
}

return (
    <div className="create">
        <h2>Add a new Note</h2>
        <form onSubmit={handleSubmit}>
            <label>Note title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Note body:</label>
            <input
                type="text"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <label>Note author:</label>
            <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                <option value="paul">paul</option>
                <option value="guest">guest</option>
            </select>
            { !isPending && <button>Add Note</button> }
            { isPending && <button>Adding Note...</button> }

        </form>
    </div>
);
}

export default Create;
