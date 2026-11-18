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
                  alt={`${c.title} concept illustration`}
                  width={640}
                  height={440}
                />
                <span>{c.title}</span>
              </button>
            ),
        )}
      </div>
      <p className="empty-note">
        Completed-project photographs will be added after owner approval. The
        visuals above are original product illustrations and do not represent
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
              alt={`${active.title} concept illustration enlarged`}
              width={900}
              height={620}
            />
            <h2 id="gallery-title">{active.title}</h2>
            <p>
              {active.short} Original product illustration; not a
              completed-project photograph.
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
