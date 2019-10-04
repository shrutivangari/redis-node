function saveLink(id, author, title, link, client) {
    client.HMSET("link:" + id, "author", author, "title", title, "link", link, "score", 0);
}

function upVote(id, client) {
    client.HINCRBY("link:" + id, "score", 1);
}

function downVote(id, client) {
    client.HINCRBY("link:" + id, "score", -1);
}

function showDetails(id, client) {
    client.HGETALL("link:" + id, function (err, replies) {
        console.log("title:", replies['title']);
        console.log("author:", replies['author']);
        console.log("link:", replies['link']);
        console.log("score:", replies['score']);
        console.log("---");
    });
}

module.exports = {
    saveLink: saveLink,
    upVote: upVote,
    downVote: downVote,
    showDetails: showDetails
}