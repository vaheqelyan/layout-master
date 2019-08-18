export const id = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

export const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// export const makeMatrix = (rows, cols) => Array.from(Array(rows), () => new Array(cols)); // make 2d array
export const initialize2DArray = (w, h, val = null) => Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

export function makeMatrixFromItems(items, _row, _col) {
  let matrix = initialize2DArray(_col, _row, ".");
  for (var i = 0; i < items.length; i++) {
    const value = items[i];
    const {
      x,
      y,
      w,
      h,
      responsive: { valueW }
    } = value;

    for (var j = y; j < y + h; j++) {
      const row = matrix[j];
      for (var k = x; k < x + (w - valueW); k++) {
        row[k] = value.templateName;
      }
    }
  }
  return matrix;
}

function tag(html) {
  return !this.noHtml ? html : "";
}

export const generateCSSOutput = (items, view, settingsRow, settingsColumn, rowHeight, columns, gap, container, noHtml = false) => {
  let rowsCount = Math.max(...items.map(val => val.y + val.h), 1);

  let vals = { auto: "auto", "1fr": "1fr" };

  var fn = tag.bind({ noHtml });

  var gridGap = `${fn('<span class="prop">')}grid-gap${fn("</span>")}: ${fn('<span class="num">')}${gap}px${fn("</span>")};`;

  var gridTemplateRowsSettings = `${fn('<span class="num">')}${`${settingsRow ? vals[settingsRow] : `${rowHeight}px`} `.repeat(rowsCount).trimRight()}${fn("</span>")}`;

  var gridTemplateColumnsSettings = `${fn('<span class="num">')}${`${vals[settingsColumn]} `.repeat(columns).trimRight()}${fn("</span>")}`;

  switch (view) {
    case "other":
      var res = items.map(value => {
        var { x, y, w, h, templateName, className } = value;
        x = x === 0 ? 1 : x + 1;
        y = y === 0 ? 1 : y + 1;
        return `.${fn('<span class="selector">')}${className}${fn("</span>")} {
  ${fn('<span class="prop">')}grid-row-start${fn("</span>")}: ${fn('<span class="num">')}${y}${fn("</span>")};
  ${fn('<span class="prop">')}grid-row-end${fn("</span>")}: ${fn('<span class="num">')}${y + h}${fn("</span>")};
  ${fn('<span class="prop">')}grid-column-start${fn("</span>")}: ${fn('<span class="num">')}${x}${fn("</span>")};
  ${fn('<span class="prop">')}grid-column-end${fn("</span>")}: ${fn('<span class="num">')}${x + w}${fn("</span>")};
}`;
      });
      if (container) {
        res = [
          ...[
            `${fn('<span class="selector">')}.container${fn("</span>")} {
  ${fn('<span class="prop">')}grid-template-rows${fn("</span>")}: ${gridTemplateRowsSettings};
  ${fn('<span class="prop">')}grid-template-columns${fn("</span>")}: ${gridTemplateColumnsSettings};
  ${gridGap}
}\n`
          ],
          ...res
        ];
      }
      if (noHtml) {
        return res.join("\n");
      }
      return res.join("\n").split("\n");
      break;

    case "grid-area":
      var res = items.map(value => {
        var { x, y, w, h, templateName,className } = value;
        x = x === 0 ? 1 : x + 1;
        y = y === 0 ? 1 : y + 1;
        return `.${fn('<span class="selector">')}${className}${fn("</span>")} {
  ${fn('<span class="prop">')}grid-area${fn("</span>")}: ${fn('<span class="num">')}${y}${fn("</span>")} / ${fn('<span class="num">')}${x}${fn("</span>")} / ${fn('<span class="num">')}${y + h}${fn("</span>")} / ${fn('<span class="num">')}${x + w}${fn("</span>")};
}`;
      });

      if (container) {
        res = [
          ...[
            `${fn('<span class="selector">')}.container${fn("</span>")} {
  ${fn('<span class="prop">')}grid-template-rows${fn("</span>")}: ${gridTemplateRowsSettings};
  ${fn('<span class="prop">')}grid-template-columns${fn("</span>")}: ${gridTemplateColumnsSettings};
  ${gridGap}
}\n`
          ],
          ...res
        ];
      }

      //<span class="num">${'1fr '.repeat(columns).trimRight()};</span>
      if (noHtml) {
        return res.join("\n");
      }
      return res.join("\n").split("\n");

      break;

    case "grid-template-areas":
      const m = makeMatrixFromItems(items, Math.max(...items.map(val => val.y + val.h), 1), columns);
      let template = m
        .join("\n")
        .split(",")
        .join(" ")
        .split("\n")
        .map((val, i) => `${" ".repeat(i === 0 ? 0 : 17)}${fn('<span class="string">')}"${val}${fn("</span>")}"`)
        .join("\n");
      var res = items.map((value, index) => {
        const {templateName,className} = value;
        return `.${fn('<span class="selector">')}${className}${fn("</span>")} {
  ${fn('<span class="prop">')}grid-area${fn("</span>")}: ${templateName};
}`;
      });

      res = [
        ...[
          `${fn('<span class="selector">')}.container${fn("</span>")} {
  ${fn('<span class="prop">')}grid-template-areas${fn("</span>")}: ${template};
  ${fn('<span class="prop">')}grid-template-rows${fn("</span>")}: ${gridTemplateRowsSettings};
  ${fn('<span class="prop">')}grid-template-columns${fn("</span>")}: ${gridTemplateColumnsSettings};
  ${gridGap}
}\n`
        ],
        ...res
      ];

      if (noHtml) {
        return res.join("\n");
      }
      return res.join("\n").split("\n");

      break;

    default:
      return [];
      break;
  }
};
