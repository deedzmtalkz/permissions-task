import { useEffect, useState } from "react";
import Switch from "react-switch";
import "./App.scss";

function App() {
  const [res, setRes] = useState([
    "users.index",
    "users.show",
    "users.store",
    "users.update",
    "users.destroy",
    "users.activities",
    "users.role.set",
    "users.deactivate",
    "roles.index",
    "roles.show",
    "roles.store",
    "resources.store",
    "resources.update",
    "resources.destroy",
    "channels.index",
    "integrations.activate",
    "integrations.deactivate",
    "integrations.active",
    "api-keys.index",
    "api-keys.show",
    "api-keys.store",
    "api-keys.update",
    "api-keys.destroy",
    "api-keys.credits.grant",
    "api-keys.credits.revoke",
  ]);

  const [standardPerms, setStandardPerms] = useState([]);
  const [additionPerms, setAdditionPerms] = useState([]);

  useEffect(() => {
    if (res.length > 0) {
      const standard = [];
      const addition = [];
      for (let i = 0; i < res.length; i++) {
        let tempStr = res[i].split(".");
        // Checking if name has a -
        if (tempStr[0].includes("-")) {
          let newName = tempStr[0].split("-");
          tempStr[0] = "";
          for (let j = 0; j < newName.length; j++) {
            tempStr[0] += newName[j].charAt(0).toUpperCase() + newName[j].slice(1) + " ";
          }
        } else {
          tempStr[0] = tempStr[0].charAt(0).toUpperCase() + tempStr[0].slice(1);
        }
        // console.log(tempStr[0]);
        // Checking for CRUD
        if (tempStr[1] === "index") {
          standard.push({
            name: tempStr[0],
            perm: "List",
            original: res[i],
          });
        } else if (tempStr[1] === "show") {
          standard.push({
            name: tempStr[0],
            perm: "Show",
            original: res[i],
          });
        } else if (tempStr[1] === "store") {
          standard.push({
            name: tempStr[0],
            perm: "Create",
            original: res[i],
          });
        } else if (tempStr[1] === "update") {
          standard.push({
            name: tempStr[0],
            perm: "Update",
            original: res[i],
          });
        } else if (tempStr[1] === "destroy") {
          standard.push({
            name: tempStr[0],
            perm: "Delete",
            original: res[i],
          });
        } else {
          if (tempStr.length > 2) {
            let perm = "";
            for (let j = tempStr.length - 1; j >= 1; j--) {
              perm += tempStr[j].charAt(0).toUpperCase() + tempStr[j].slice(1) + " ";
            }
            addition.push({
              name: tempStr[0],
              perm,
              original: res[i],
            });
          } else if (tempStr.length === 2) {
            addition.push({
              name: tempStr[0],
              perm: tempStr[1].charAt(0).toUpperCase() + tempStr[1].slice(1),
              original: res[i],
            });
          }
        }
      }
      // Arranging the standard Perms Array
      let tempArr = [];
      for (let i = 0; i < standard.length; i++) {
        let found = false;
        for (let j = 0; j < tempArr.length; j++) {
          if (tempArr[j].name === standard[i].name) {
            found = true;
            if (standard[i].perm === "List") tempArr[j].perms.List = standard[i];
            else if (standard[i].perm === "Show") tempArr[j].perms.Show = standard[i];
            else if (standard[i].perm === "Create") tempArr[j].perms.Create = standard[i];
            else if (standard[i].perm === "Update") tempArr[j].perms.Update = standard[i];
            else if (standard[i].perm === "Delete") tempArr[j].perms.Delete = standard[i];
          }
        }
        if (!found) {
          if (standard[i].perm === "List")
            tempArr.push({
              name: standard[i].name,
              perms: {
                List: standard[i],
                Show: null,
                Create: null,
                Update: null,
                Delete: null,
              },
            });
          else if (standard[i].perm === "Show")
            tempArr.push({
              name: standard[i].name,
              perms: {
                List: null,
                Show: standard[i],
                Create: null,
                Update: null,
                Delete: null,
              },
            });
          else if (standard[i].perm === "Create")
            tempArr.push({
              name: standard[i].name,
              perms: {
                List: null,
                Show: null,
                Create: standard[i],
                Update: null,
                Delete: null,
              },
            });
          else if (standard[i].perm === "Update")
            tempArr.push({
              name: standard[i].name,
              perms: {
                List: null,
                Show: null,
                Create: null,
                Update: standard[i],
                Delete: null,
              },
            });
          else if (standard[i].perm === "Delete")
            tempArr.push({
              name: standard[i].name,
              perms: {
                List: null,
                Show: null,
                Create: null,
                Update: null,
                Delete: standard[i],
              },
            });
        }
      }
      console.log(tempArr);
      // Setting states
      setStandardPerms(tempArr);
      setAdditionPerms(addition);
    }
  }, []);

  const onSwitchChange = (original) => {
    setRes((prev) => {
      if (prev.includes(original)) {
        const index = prev.indexOf(original);
        if (index > -1) prev.splice(index, 1);
      } else {
        prev.push(original);
      }
      return [...prev];
    });
  };

  return (
    <section id="App">
      <div>
        <h3>Standard Permissions</h3>
        <table className="standard-perms">
          <tbody>
            <tr>
              <th></th>
              <th>LIST</th>
              <th>SHOW</th>
              <th>CREATE</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
            {standardPerms.map((element, index) => (
              <tr key={index}>
                <td className="name">{element.name}</td>
                {element.perms.List !== null ? (
                  <td>
                    <Switch
                      onChange={() => onSwitchChange(element.perms.List.original)}
                      checked={res.includes(element.perms.List.original)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {element.perms.Show !== null ? (
                  <td>
                    <Switch
                      onChange={() => onSwitchChange(element.perms.Show.original)}
                      checked={res.includes(element.perms.Show.original)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {element.perms.Create !== null ? (
                  <td>
                    <Switch
                      onChange={() => onSwitchChange(element.perms.Create.original)}
                      checked={res.includes(element.perms.Create.original)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {element.perms.Update !== null ? (
                  <td>
                    <Switch
                      onChange={() => onSwitchChange(element.perms.Update.original)}
                      checked={res.includes(element.perms.Update.original)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {element.perms.Delete !== null ? (
                  <td>
                    <Switch
                      onChange={() => onSwitchChange(element.perms.Delete.original)}
                      checked={res.includes(element.perms.Delete.original)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Additional Perms */}
      <div>
        <h3>Additional Permissions</h3>
        <table className="additional-perms">
          <tbody>
            {additionPerms.map((element, index) => (
              <tr key={index}>
                <td className="name">
                  {element.name} - {element.perm}
                </td>
                <td>
                  <Switch onChange={() => onSwitchChange(element.original)} checked={res.includes(element.original)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Submit */}
      <button onClick={() => console.log(res)}>Submit</button>
    </section>
  );
}

export default App;
