"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { categories } from "@/lib/services";
export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  const active = selected === null ? null : categories[selected];
  return (
    <>
      <div className="filters" aria-label="Filter gallery">
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          All Products
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setFilter(c.slug)}
            aria-pressed={filter === c.slug}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {categories.map(
          (c, i) =>
            (filter === "all" || filter === c.slug) && (
              <button
                key={c.slug}
                className="gallery-item"
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setSelected(i);
                }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                <span>{c.title}</span>
              </button>
            ),
        )}
      </div>
      <p className="empty-note">
        Completed-project photographs will be added after owner approval. The
        visuals above are AI-generated product images and do not represent
        completed Sahu projects.
      </p>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby="gallery-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && (
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              aria-label="Close image"
              onClick={close}
            >
              <X />
            </button>
            <Image
              src={active.image}
              alt={`${active.title}, enlarged view`}
              width={1200}
              height={800}
              sizes="(max-width: 820px) 100vw, 820px"
            />
            <h2 id="gallery-title">{active.title}</h2>
            <p>
              {active.short} AI-generated product visual; not a
              completed-project photograph.
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
