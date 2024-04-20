export async function getPostBySlug(slug) {
    return await client
      .items()
      .equalsFilter("elements.slug", slug)
      .toPromise()
      .then((response) => parsePost(response.data.items[0]));
  }