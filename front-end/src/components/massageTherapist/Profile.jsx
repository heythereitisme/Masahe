import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AvatarEditor from "react-avatar-editor";

const Profile = ({ value }) => {
  const auth = useContext(AuthContext);
  const logout = auth.logout;
  const user = auth.user;
  const userInfo = auth.userInfo;
  let editorRef = useRef(null);
  const updater = auth.permissionChecker
  const [quadrant, setQuadrant] = useState([]);
  const [about, setAbout] = useState("");
  const [ava, setAva] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [clientQuadrant, setClientQuadrant] = useState(["NE"]);
  const [registered, setRegistered] = useState(false)
  const [regDate, setRegDate] = useState(null)
  const [scale, setScale] = useState(1);
  const [preview, setPreview] = useState(null)

  
  useEffect(() => {
    if (auth) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setQuadrant(userInfo.quadrant);
      setAbout(userInfo.about);
      setAddress(userInfo.address);
      setEmail(user.email);
      setPhoneNumber(userInfo.phoneNumber);
      setClientQuadrant(userInfo.quadrant[0]);
      setAva(userInfo.avatar);
      setRegistered(userInfo.licensed.reg)
      setRegDate(new Date(userInfo.licensed.date).toLocaleDateString())
    }
  }, []);

  const checkbox = (e) => {
    const value = e.target.value;
    if (quadrant.includes(value)) {
      setQuadrant(quadrant.filter((v) => v !== value));
    } else {
      setQuadrant([...quadrant, value]);
    }
  };

  const licenseBox = () => {
    if (registered === false) {
      setRegistered( true);
    } else {
      setRegistered(false);
    }
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setAva(fileUrl);
  };

  const handleScale = (e) => {
    const scaler = parseFloat(e.target.value);
    setScale(scaler);
  };

  const handlePreview = () => {
    const canvas = editorRef.getImageScaledToCanvas()
    const url = canvas.toDataURL()
    setPreview(url)
  }

  const setEditorRef = (ed) => {
    editorRef = ed
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = user.displayName;
    if (value === 1) {
      const updatedUser = {
        quadrant: clientQuadrant,
        about,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        username,
      };
      updateUser(updatedUser);
      updater(user.accessToken, user.displayName)
    } else if (value === 2) {
      const updatedUser = {
        quadrant,
        about,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        username,
        licensed:{reg: registered, date: regDate}
      };
      updateUser(updatedUser);
      updater(user.accessToken, user.displayName)
    }
  };

  const updateUser = async (u) => {
    const req = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(u),
    });
    const updated = await req.json();
    alert(updated.message);
  };

  if (value >= 2) {
    return (
      <>
        <div className="min-h-screen">
          <div className="md:grid md:grid-cols-3 md:gap-6 rounded-sm bg-slate-50 ">
            <div className="md:col-span-1  rounded-sm bg-slate-50 flex flex-col place-content-between h-48">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-title leading-6 p-2 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm font-body ml-2 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-md font-title text-gray-700"
                        >
                          Preferred work area
                        </label>
                        <div className="form-control">
                          <label className="cursor-pointer label">
                            <span className="label-text font-title text-neutral">
                              North East
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              value="NE"
                              onChange={checkbox}
                              checked={quadrant.includes("NE")}
                            />
                          </label>
                        </div>

                        <div className="form-control">
                          <label className="cursor-pointer label ">
                            <span className="label-text font-title text-neutral">
                              North West
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              value="NW"
                              onChange={checkbox}
                              checked={quadrant.includes("NW")}
                            />
                          </label>
                        </div>

                        <div className="form-control">
                          <label className="cursor-pointer label">
                            <span className="label-text font-title text-neutral">
                              South East
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              value="SE"
                              onChange={checkbox}
                              checked={quadrant.includes("SE")}
                            />
                          </label>
                        </div>

                        <div className="form-control">
                          <label className="cursor-pointer label">
                            <span className="label-text font-title text-neutral">
                              South West
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              value="SW"
                              onChange={checkbox}
                              checked={quadrant.includes("SW")}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                          defaultValue={about}
                          onInput={(e) => setAbout(e.target.value)}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center gap-5">
                        <AvatarEditor
                        ref={setEditorRef}
                          image={ava}
                          width={200}
                          height={200}
                          border={50}
                          borderRadius={200}
                          color={[255, 255, 255, 0.6]} // RGBA
                          scale={scale}
                          rotate={0}
                        />

                        <button
                          type="button"
                          onClick={handlePreview}
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                        {preview && <img src={preview} alt="Preview" className="rounded-full"/>}
                      </div>
                      <div>
                        <input
                          type="file"
                          className="ml-3"
                          onChange={fileChange}
                          accept="image/png,image/jpeg,image/gif"
                        />
                      </div>
                      <div>
                        Zoom:
                        <input
                          name="scale"
                          type="range"
                          onChange={handleScale}
                          min="1"
                          max="2.5"
                          step="0.01"
                          defaultValue="1"
                        />
                      </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={firstName}
                              onInput={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={lastName}
                              onInput={(e) => setLastName(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={email}
                              onInput={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Street address
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={address}
                              onInput={(e) => setAddress(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone number (Format: 000-000-0000)
                            </label>
                            <input
                              type="tel"
                              name="phone-number"
                              id="phone-number"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              autoComplete="phone-number"
                              placeholder="123-456-7890"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={phoneNumber}
                              onInput={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <div className="form-control col-span-6">
                            <div className="flex gap-2">
                          
                            <span className="label-text font-title text-neutral">
                              Registered:
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              onChange={licenseBox}
                              checked={registered}
                              />
                              <span className="label-text font-title text-neutral ml-5">
                              Expiration date:
                            </span>
                          <input type="date" defaultValue={regDate} onChange={(e) => setRegDate(e.target.value)}/>
                              </div>
                        </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          onClick={logout}
                          className="mx-auto mb-5 w-24 h-10 rounded-md border border-gray-300 bg-secondary py-2 px-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                        >
                          Log out
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-5"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else if (value === 1) {
    return (
      <>
        <div className="min-h-screen">
          <div className="md:grid md:grid-cols-3 md:gap-6 rounded-sm bg-slate-50 ">
            <div className="md:col-span-1  rounded-sm bg-slate-50 flex flex-col place-content-between h-48">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-title leading-6 p-2 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm font-body ml-2 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-md font-title text-gray-700"
                        >
                          Quadrant
                        </label>

                        <div className="dropdown dropdown-bottom">
                          <label
                            tabIndex={0}
                            className="btn btn-secondary m-1 font-title"
                          >
                            {clientQuadrant}
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary gap-5"
                          >
                            <li onClick={() => setClientQuadrant(["NE"])}>
                              North East
                            </li>
                            <li onClick={() => setClientQuadrant(["NW"])}>
                              North West
                            </li>
                            <li onClick={() => setClientQuadrant(["SE"])}>
                              South East
                            </li>
                            <li onClick={() => setClientQuadrant(["SW"])}>
                              South West
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                          defaultValue={about}
                          onInput={(e) => setAbout(e.target.value)}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center gap-5">
                        <AvatarEditor
                        ref={setEditorRef}
                          image={ava}
                          width={200}
                          height={200}
                          border={50}
                          borderRadius={200}
                          color={[255, 255, 255, 0.6]} // RGBA
                          scale={scale}
                          rotate={0}
                        />

                        <button
                          type="button"
                          onClick={handlePreview}
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                        {preview && <img src={preview} alt="Preview" className="rounded-full"/>}
                      </div>
                      <div>
                        <input
                          type="file"
                          className="ml-3"
                          onChange={fileChange}
                          accept="image/png,image/jpeg,image/gif"
                        />
                      </div>
                      <div>
                        Zoom:
                        <input
                          name="scale"
                          type="range"
                          onChange={handleScale}
                          min="1"
                          max="2.5"
                          step="0.01"
                          defaultValue="1"
                        />
                      </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={firstName}
                              onInput={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={lastName}
                              onInput={(e) => setLastName(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={email}
                              onInput={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Street address
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={address}
                              onInput={(e) => setAddress(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone number (Format: 000-000-0000)
                            </label>
                            <input
                              type="tel"
                              name="phone-number"
                              id="phone-number"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              autoComplete="phone-number"
                              placeholder="123-456-7890"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={phoneNumber}
                              onInput={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          onClick={logout}
                          className="mx-auto mb-5 w-24 h-10 rounded-md border border-gray-300 bg-secondary py-2 px-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                        >
                          Log out
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-5"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
