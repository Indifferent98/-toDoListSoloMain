describe("addItemForm", () => {
  it("add item from base example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

describe("addItemForm", () => {
  it("add-item-form-error-story, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-error-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

describe("addItemForm", () => {
  it("add-item-form-long-title-warning-story, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-long-title-warning-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

describe("addItemForm", () => {
  it("add-item-form-with-empty-text-field-story, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-with-empty-text-field-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

describe("addItemForm", () => {
  it("add-item-form-with-focus-text-field-story, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-with-focus-text-field-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

describe("addItemForm", () => {
  it("add-item-form-when-trying-add-empty-space-story, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-when-trying-add-empty-space-story&viewMode=story",
      {
        waitUntil: "networkidle2",
      }
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
