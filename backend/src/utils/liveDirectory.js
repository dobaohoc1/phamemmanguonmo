const LiveDirectory = require("live-directory");

const LiveAssets = new LiveDirectory("./src/assets", {
  filter: {
    keep: {
      extensions: ["js", "css", "woff2", "ttf", "jpg", "png", "webp"],
    },
  },
  cache: {
    max_file_count: 200,
    max_file_size: 1024 * 1024 * 2.5,
  },
});

exports.liveDirectory = async (request, response) => {
  const path = request.path.replace("/assets", "");

  const file = LiveAssets.get(path);

  if (file === undefined) return response.status(404).send();
  const fileParts = file.path.split(".");
  const extension = fileParts[fileParts.length - 1];
  const content = file.content;
  if (!file) return response.status(404).send('Not Found');
  if (file.cached) {
    return response.type(extension).send(content);
  } else {
    const readable = file.stream();
    return readable.pipe(response);
  }
};
