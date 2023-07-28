import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests,
  // SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { cobalt2 } from "@codesandbox/sandpack-themes";
// import SimpleCodeViewer from './SimpleCodeViewer';
import { useState } from "react";

export const TEST_TYPESCRIPT_TEMPLATE = [
  {
    files: {
      "tsconfig.json": {
        code: `{
          "include": [
            "./**/*"
          ],
          "compilerOptions": {
            "strict": true,
            "esModuleInterop": true,
            "lib": [ "dom", "es2015" ],
            "jsx": "react-jsx"
          }
        }`,
        hidden: true,
        readOnly: true,
      },
      "/add.js": {
        code: `export const add = (a, b) => {
            
};`,
        active: true,
      },
      "/add.test.ts": {
        code: `import { add } from './add';
        
        describe('add', () => {
          test('Commutative Law of Addition', () => {
            expect(add(1, 2)).toBe(3);
            expect(add(3, 2)).toBe(5);
            expect(add(2, 2)).toBe(4);
            expect(add(6, 2)).toBe(8);
            expect(add(11, 21)).toBe(32);
            expect(add(123, 231)).toBe(354);
          });
        });`,
        readOnly: true,
      },
      "package.json": {
        code: JSON.stringify({
          dependencies: {},
          devDependencies: { typescript: "^4.0.0" },
          main: "/add.ts",
        }),
        hidden: true,
        readOnly: true,
      },
    },
    main: "/add.test.ts",
    environment: "parcel",
    mode: "tests",
  },
  {
    files: {
      "tsconfig.json": {
        code: `{
              "include": [
                "./**/*"
              ],
              "compilerOptions": {
                "strict": true,
                "esModuleInterop": true,
                "lib": [ "dom", "es2015" ],
                "jsx": "react-jsx"
              }
            }`,
        hidden: true,
        readOnly: true,
      },
      "/multiply.js": {
        code: `export const multiply = (a, b) => a + b;`,
        active: true,
      },
      "/multiply.test.ts": {
        code: `import { multiply } from './multiply';
            
            describe('multiply', () => {
              test('Commutative Law of Multiplication', () => {
                expect(multiply(2,3)).toBe(6);
              });
            });`,
        readOnly: true,
      },
      "package.json": {
        code: JSON.stringify({
          dependencies: {},
          devDependencies: { typescript: "^4.0.0" },
          main: "/multiply.ts",
        }),
        hidden: true,
        readOnly: true,
      },
    },
    main: "/add.test.ts",
    environment: "parcel",
    mode: "tests",
  },
];

export const TEST_TYPESCRIPT_TEMPLATE2 = {
  files: {
    "tsconfig.json": {
      code: `{
      "include": [
        "./**/*"
      ],
      "compilerOptions": {
        "strict": true,
        "esModuleInterop": true,
        "lib": [ "dom", "es2015" ],
        "jsx": "react-jsx"
      }
    }`,
      hidden: true,
      readOnly: true,
    },
    "/multiply.js": {
      code: `export const multiply = (a, b) => a + b;`,
      active: true,
    },
    "/multiply.test.ts": {
      code: `import { multiply } from './multiply';
    
    describe('multiply', () => {
      test('Commutative Law of Multiplication', () => {
        expect(multiply(2,3)).toBe(6);
      });
    });`,
      readOnly: true,
    },
    "package.json": {
      code: JSON.stringify({
        dependencies: {},
        devDependencies: { typescript: "^4.0.0" },
        main: "/multiply.ts",
      }),
      hidden: true,
      readOnly: true,
    },
  },
  main: "/multiply.test.ts",
  environment: "parcel",
  mode: "tests",
};

export default () => {
  const [submit, setSubmit] = useState(false);
  return (
    <>
      <h1>Sandpack</h1>
      <SandpackProvider
        theme={"dark"}
        customSetup={{ dependencies: { "jest-extended": "^3.0.2" } }}
        // files={{ "/extended.test.ts": extendedTest,  }}
        // files={TEST_TYPESCRIPT_TEMPLATE}
        {...TEST_TYPESCRIPT_TEMPLATE[0]}
        // template="test-ts"
      >
        <SandpackLayout>
          {/* <SandpackFileExplorer /> */}
          <SandpackCodeEditor />
          <SandpackTests onComplete={(specs) => console.log(specs)} />
        </SandpackLayout>
      </SandpackProvider>
      <SandpackProvider
        theme={cobalt2}
        customSetup={{ dependencies: { "jest-extended": "^3.0.2" } }}
        // files={{ "/extended.test.ts": extendedTest,  }}
        // files={TEST_TYPESCRIPT_TEMPLATE}
        {...TEST_TYPESCRIPT_TEMPLATE2}
        // template="test-ts"
      >
        <SandpackLayout>
          {/* <SandpackFileExplorer /> */}
          <SandpackCodeEditor />
          <SandpackTests
            onComplete={(specs) => console.log(specs, ",,,Test?")}
          />
        </SandpackLayout>
      </SandpackProvider>
      {/* <button onClick={() => {
          setSubmit(true);
        }}>Run Test</button> */}
      <hr />
      {/* <Home /> */}
    </>
  );
};
