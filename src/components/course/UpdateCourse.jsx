import { use, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router";
import { Check, Plus, RotateCcw, Star, Trash2, TrendingUp, Users } from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext";

const API = "https://backend-olp.vercel.app";

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6D28D9] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1160px] mx-auto px-5";
const GRID =
  "bg-[#6D28D9] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const SHAPE = "absolute z-[1]";
const TRIANGLE = "[clip-path:polygon(45%_0,100%_88%,0_100%)]";
const BLOB = "rounded-[50px_50px_100px_100px]";
const CARD =
  "bg-white border border-[#dfe1f5] rounded-[18px] p-6 max-[560px]:p-5 shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]";
const INPUT = `w-full h-11 px-4 rounded-xl border border-[#dfe1f5] bg-white text-[15px] text-[#14163b] placeholder:text-[#8a8ea8] read-only:bg-[#f1f2f4] read-only:text-[#5a5d80] ${FV}`;
const TEXTAREA = `w-full px-4 py-3 rounded-xl border border-[#dfe1f5] bg-white text-[15px] text-[#14163b] placeholder:text-[#8a8ea8] resize-none ${FV}`;
const BTN_ACC = `inline-flex items-center justify-center gap-2 border-0 rounded-full px-6 py-3 font-bold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] disabled:opacity-60 disabled:cursor-not-allowed ${FV}`;
const BTN_SOFT = `inline-flex items-center justify-center gap-2 border-0 rounded-full px-6 py-3 font-semibold text-[15px] cursor-pointer bg-[#f1f2f4] text-[#333] disabled:opacity-60 disabled:cursor-not-allowed ${FV}`;
const THUMB_PILL = "relative bg-white/85 text-[#14163b] text-[11px] px-2 py-[3px] rounded-full";

const EMPTY_FEATURE = { title: "", description: "" };

const SWAL_CLASSES = {
  popup: "!rounded-[20px] !font-[inherit]",
  title: "!text-[#14163b] !font-semibold",
  htmlContainer: "!text-[#5a5d80]",
  confirmButton: `!rounded-full !bg-[#c8ff00] !text-[#14163b] !font-semibold !px-6 !py-3 !shadow-none ${FV}`,
};

const swal = (options) =>
  Swal.fire({ buttonsStyling: false, customClass: SWAL_CLASSES, ...options });

const str = (v) => (v == null ? "" : String(v));

const toForm = (c) => ({
  level: str(c?.level),
  category: str(c?.category),
  title: str(c?.title),
  description: str(c?.description),
  lessons: str(c?.lessons),
  duration: str(c?.duration),
  price: str(c?.price),
  oprice: str(c?.oprice),
  imageURL: str(c?.imageURL),
  insName: str(c?.instructor?.name),
  insTitle: str(c?.instructor?.title),
  insAvatar: str(c?.instructor?.avatar),
});

const toFeatures = (c) =>
  Array.isArray(c?.features) && c.features.length > 0
    ? c.features.map((f) => ({ title: str(f?.title), description: str(f?.description) }))
    : [{ ...EMPTY_FEATURE }];

function Field({ label, htmlFor, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block mb-1.5 text-sm font-medium text-[#14163b]">
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({ step, title, hint }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="grid place-items-center w-9 h-9 rounded-full bg-[#c8ff00] text-[#14163b] text-sm font-bold shrink-0">
        {step}
      </span>
      <div>
        <h2 className="m-0 text-lg font-semibold leading-[1.2]">{title}</h2>
        {hint && <p className="m-0 text-xs text-[#5a5d80]">{hint}</p>}
      </div>
    </div>
  );
}

function PreviewCard({ form, features, course }) {
  const price = Number(form.price) || 0;
  const oprice = Number(form.oprice) || 0;
  const hasDiscount = oprice > price && price > 0;
  const discount = hasDiscount ? Math.round(((oprice - price) / oprice) * 100) : 0;
  const featureCount = features.filter((f) => f.title.trim()).length;

  return (
    <article className="bg-white border border-[#dfe1f5] rounded-[18px] overflow-hidden flex flex-col shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]">
      <div className="relative h-[170px] flex items-end justify-between gap-1.5 p-3.5 bg-[linear-gradient(135deg,#dfe6ff,#f4ffc9)]">
        {form.imageURL && (
          <img
            key={form.imageURL}
            src={form.imageURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
        {course?.courseType && (
          <span className="absolute top-3 right-3 z-[1] inline-flex items-center gap-1 bg-[#c8ff00] text-[#14163b] text-[11px] font-bold px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
            {course.courseType}
          </span>
        )}
        {form.lessons && <span className={THUMB_PILL}>{form.lessons} Lessons</span>}
        {form.duration && <span className={THUMB_PILL}>{form.duration}</span>}
        {course?.students != null && (
          <span className={THUMB_PILL}>{course.students} Students</span>
        )}
      </div>

      <div className="p-[18px] flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <span className="text-[11px] font-semibold text-[#6D28D9] bg-[#eef2ff] rounded-full px-2.5 py-1 truncate">
            {form.category || "Category"}
          </span>
          {course?.rating != null && (
            <span className="text-sm text-[#5a5d80] inline-flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              {course.rating}
              {course.reviews != null && <span className="text-xs">({course.reviews})</span>}
            </span>
          )}
        </div>

        <h3 className="m-0 text-base font-bold leading-[1.3] tracking-[-.02em] line-clamp-2 break-words">
          {form.title || "Your course title"}
        </h3>
        <p className="m-0 text-sm text-[#5a5d80] line-clamp-2 break-words">
          {form.description || "Your course description will appear here."}
        </p>

        <div className="flex items-center gap-2 mt-1 min-h-8">
          {form.insAvatar && (
            <img
              key={form.insAvatar}
              src={form.insAvatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover bg-[#e4e4e4]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
          <div className="min-w-0 leading-tight">
            <p className="m-0 text-xs font-semibold truncate">{form.insName || "Instructor name"}</p>
            <p className="m-0 text-[11px] text-[#5a5d80] truncate">{form.insTitle || "Instructor title"}</p>
          </div>
        </div>

        <div className="pt-3 flex items-baseline gap-2 flex-wrap">
          <b className="text-lg font-extrabold">${price}</b>
          {hasDiscount && (
            <>
              <span className="text-xs text-[#8a8ea8] line-through">${oprice}</span>
              <span className="bg-[#14163b] text-white text-[11px] font-bold rounded-full px-2 py-0.5">
                {discount}% OFF
              </span>
            </>
          )}
          <span className="text-[11px] text-[#5a5d80]">/lifetime</span>
        </div>

        {featureCount > 0 && (
          <p className="m-0 mt-1 text-xs text-[#5a5d80] inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#6D28D9]" aria-hidden="true" />
            {featureCount} {featureCount === 1 ? "feature" : "features"} included
          </p>
        )}
      </div>
    </article>
  );
}

export default function UpdateCourse() {
  const { user } = use(AuthContext);
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(toForm(null));
  const [features, setFeatures] = useState([{ ...EMPTY_FEATURE }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fontId = "bytespace-poppins";
    if (document.getElementById(fontId)) return;

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";

    const stylesheet = document.createElement("link");
    stylesheet.id = fontId;
    stylesheet.rel = "stylesheet";
    stylesheet.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

    document.head.append(preconnect, stylesheet);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API}/myCourse/${id}`)
      .then((res) => {
        if (cancelled) return;
        setCourse(res.data);
        setForm(toForm(res.data));
        setFeatures(toFeatures(res.data));
      })
      .catch((err) => console.log(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  const setField = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const changeFeature = (index, field, value) =>
    setFeatures((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  const addFeature = () => setFeatures((prev) => [...prev, { ...EMPTY_FEATURE }]);
  const removeFeature = (index) => setFeatures((prev) => prev.filter((_, i) => i !== index));

  const isDirty = useMemo(
    () =>
      JSON.stringify({ form, features }) !==
      JSON.stringify({ form: toForm(course), features: toFeatures(course) }),
    [form, features, course]
  );

  const resetChanges = () => {
    setForm(toForm(course));
    setFeatures(toFeatures(course));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const updatedCourse = {
      level: form.level,
      category: form.category,
      title: form.title,
      description: form.description,
      lessons: form.lessons,
      duration: form.duration,
      price: Number(form.price),
      oprice: Number(form.oprice),
      imageURL: form.imageURL,
      rating: course?.rating,
      reviews: course?.reviews,
      students: course?.students,
      courseType: course?.courseType,
      features: features.filter((f) => f.title.trim()),
      instructor: {
        name: form.insName,
        title: form.insTitle,
        avatar: form.insAvatar,
        email: user?.email,
      },
      createdAt: course?.createdAt,
    };

    setSubmitting(true);
    try {
      await axios.put(`${API}/updatedCourse/${id}`, updatedCourse);
      setCourse((prev) => ({ ...prev, ...updatedCourse }));
      setFeatures(toFeatures(updatedCourse));
      swal({
        title: "Updated Successfully!",
        text: "The course has been updated successfully.",
        icon: "success",
        confirmButtonText: "Got it!",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      swal({
        title: "Error!",
        text: `${err.message}. Please try again.`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const shell =
    "min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] [padding-top:env(safe-area-inset-top,0px)] [padding-bottom:env(safe-area-inset-bottom,0px)]";

  if (loading) {
    return (
      <div className={`${shell} grid place-items-center`}>
        <p className="text-[#5a5d80]">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={`${shell} grid place-items-center`}>
        <div className="text-center">
          <p className="text-[#5a5d80] mb-4">Course not found.</p>
          <Link to="/myCourses" className={BTN_ACC}>
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <header className={`relative ${GRID} text-white overflow-hidden pt-32 pb-24 max-[860px]:pt-24`}>
        <span className={`${SHAPE} left-[-70px] top-[60px] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[22deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[-80px] top-[40px] w-[210px] h-[280px] ${BLOB} bg-[#c8ff00] -rotate-[14deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[22%] bottom-[-30px] w-[110px] h-[120px] bg-white ${TRIANGLE} max-[860px]:hidden`} />

        <div className={`${WRAP} relative z-[2] text-center`}>
          <p className="m-0 mb-3 text-sm font-medium uppercase tracking-[.2em] text-[#c8ff00]">
            Instructor Studio
          </p>
          <h1 className="m-0 font-semibold leading-[1.1] tracking-[-.02em] text-[clamp(36px,6vw,64px)]">
            Update Course
          </h1>
          <p className="mt-5 mx-auto max-w-[60ch] text-[17px] text-white/[.92]">
            Edit the details on the left and see your course card update on the right.
          </p>
        </div>
      </header>

      <main className="relative z-[3] pb-20 max-[860px]:pb-14">
        <div className={WRAP}>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[1.5fr_1fr] max-[960px]:grid-cols-1 gap-8 -mt-12 items-start"
          >
            <div className="grid gap-6 min-w-0">
              <section className={CARD}>
                <SectionTitle step="1" title="Course Basics" hint="What is this course about?" />
                <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-4">
                  <Field label="Level" htmlFor="level">
                    <input id="level" name="level" value={form.level} onChange={setField} required placeholder="1" className={INPUT} />
                  </Field>
                  <Field label="Category" htmlFor="category">
                    <input id="category" name="category" value={form.category} onChange={setField} required placeholder="Artificial Intelligence" className={INPUT} />
                  </Field>
                  <Field label="Course Title" htmlFor="title" className="col-span-2 max-[560px]:col-span-1">
                    <input id="title" name="title" value={form.title} onChange={setField} required placeholder="Advanced Machine Learning & AI Masterclass" className={INPUT} />
                  </Field>
                  <Field label="Description" htmlFor="description" className="col-span-2 max-[560px]:col-span-1">
                    <textarea id="description" name="description" rows={4} value={form.description} onChange={setField} required placeholder="Master cutting-edge ML algorithms and deep learning techniques..." className={TEXTAREA} />
                  </Field>
                </div>
              </section>

              <section className={CARD}>
                <SectionTitle step="2" title="Content & Pricing" hint="Size, price and cover image" />
                <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-4">
                  <Field label="Lessons" htmlFor="lessons">
                    <input id="lessons" name="lessons" value={form.lessons} onChange={setField} required placeholder="156" className={INPUT} />
                  </Field>
                  <Field label="Duration" htmlFor="duration">
                    <input id="duration" name="duration" value={form.duration} onChange={setField} required placeholder="48h" className={INPUT} />
                  </Field>
                  <Field label="Price ($)" htmlFor="price">
                    <input id="price" name="price" type="number" min="0" value={form.price} onChange={setField} required placeholder="149" className={INPUT} />
                  </Field>
                  <Field label="Original Price ($)" htmlFor="oprice">
                    <input id="oprice" name="oprice" type="number" min="0" value={form.oprice} onChange={setField} required placeholder="299" className={INPUT} />
                  </Field>
                  <Field label="Course Image URL" htmlFor="imageURL" className="col-span-2 max-[560px]:col-span-1">
                    <input id="imageURL" name="imageURL" type="url" value={form.imageURL} onChange={setField} required placeholder="https://images.unsplash.com/photo..." className={INPUT} />
                  </Field>
                </div>
              </section>

              <section className={CARD}>
                <div className="flex items-start justify-between gap-3">
                  <SectionTitle step="3" title="What's Included" hint="Highlights learners will get" />
                  <button
                    type="button"
                    onClick={addFeature}
                    className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-sm font-medium cursor-pointer border-0 bg-[#f1f2f4] text-[#333] hover:bg-[#c8ff00] transition-colors ${FV}`}
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add Feature
                  </button>
                </div>
                <div className="grid gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="border border-[#dfe1f5] rounded-2xl p-4 grid gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5a5d80]">
                          Feature {index + 1}
                        </span>
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            aria-label={`Remove feature ${index + 1}`}
                            className={`grid place-items-center w-8 h-8 rounded-full border-0 bg-[#f1f2f4] text-[#14163b] cursor-pointer hover:bg-[#ffe1e1] hover:text-[#c62828] transition-colors ${FV}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                      <input
                        value={feature.title}
                        onChange={(e) => changeFeature(index, "title", e.target.value)}
                        aria-label={`Feature ${index + 1} title`}
                        placeholder="Feature title"
                        className={INPUT}
                      />
                      <textarea
                        rows={2}
                        value={feature.description}
                        onChange={(e) => changeFeature(index, "description", e.target.value)}
                        aria-label={`Feature ${index + 1} description`}
                        placeholder="Feature description"
                        className={TEXTAREA}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className={CARD}>
                <SectionTitle step="4" title="Instructor" hint="Who is teaching this course?" />
                <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-4">
                  <Field label="Name" htmlFor="insName">
                    <input id="insName" name="insName" value={form.insName} onChange={setField} required placeholder="Dr. Sarah Chen" className={INPUT} />
                  </Field>
                  <Field label="Title" htmlFor="insTitle">
                    <input id="insTitle" name="insTitle" value={form.insTitle} onChange={setField} required placeholder="AI Research Lead" className={INPUT} />
                  </Field>
                  <Field label="Avatar URL" htmlFor="insAvatar" className="col-span-2 max-[560px]:col-span-1">
                    <input id="insAvatar" name="insAvatar" type="url" value={form.insAvatar} onChange={setField} required placeholder="https://i.pravatar.cc/150?img=5" className={INPUT} />
                  </Field>
                  <Field label="Email" htmlFor="email" className="col-span-2 max-[560px]:col-span-1">
                    <input id="email" type="email" value={user?.email ?? ""} readOnly className={INPUT} />
                  </Field>
                </div>
              </section>
            </div>

            <aside className="min-w-0 grid gap-5 min-[961px]:sticky min-[961px]:top-6">
              <div>
                <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-[#5a5d80]">
                  Live Preview
                </p>
                <PreviewCard form={form} features={features} course={course} />
              </div>

              <div className={CARD}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Status</span>
                  <span
                    className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                      isDirty ? "bg-[#c8ff00] text-[#14163b]" : "bg-[#eef2ff] text-[#6D28D9]"
                    }`}
                  >
                    {isDirty ? "Unsaved changes" : "Up to date"}
                  </span>
                </div>
                <p className="m-0 text-xs text-[#5a5d80]">
                  Rating, reviews, students and badge are kept as they are.
                </p>
                <div className="grid gap-3 mt-5">
                  <button type="submit" disabled={submitting || !isDirty} className={BTN_ACC}>
                    {submitting ? "Updating..." : (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Update Course
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetChanges}
                    disabled={submitting || !isDirty}
                    className={BTN_SOFT}
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    Reset Changes
                  </button>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </div>
  );
}