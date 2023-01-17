import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Card from "../components/Card";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Blog = () => {
  const { user, router, data, setData } = useAuth();

  useEffect(() => {
    const updatedData = onSnapshot(
      collection(db, "blogs"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <section>
        {user ? (
          <div>
            <header className="flex justify-end items-center p-4">
              <button
                className="flex justify-between items-center border-2 border-sky-600 rounded-lg px-4 py-2 text-sky-600"
                onClick={() => router.push("/addData")}
              >
                <p>Add Blog</p>
                <AddIcon />
              </button>
            </header>
            <section className="flex flex-wrap items-center gap-2 p-4">
              {data.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  desc={item.desc}
                  authorName={item.author}
                  day={item.day}
                  month={item.month}
                  year={item.year}
                />
              ))}
            </section>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Blog;
