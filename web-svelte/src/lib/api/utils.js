import { ActiveOptionEnum } from "$lib/enum.js";

export function HandleJSON(activeOption, input) {
  if (activeOption === ActiveOptionEnum.BLOGTAG)
    return JSON.stringify({
      "id": input.id,
      "name": input.name,
    })

  if (activeOption === ActiveOptionEnum.BLOGFILE)
    return JSON.stringify({
      "id": input.id,
      "filename": input.filename,
    })
}