import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../css/AddPostModal.css";


interface Props {
    onClose: () => void;
    onSave: (post: Post) => void;
    editPost?: Post | null;
}

export default function AddPostModal({ onClose, onSave, editPost }: Props) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        category: "",
        coverImage: "",
        gallery: [] as string[],
        content: "",
    });
   useEffect(() => {
        if (editPost) {
            setForm({
                title: editPost.title,
                slug: editPost.slug,
                category: editPost.category,
                coverImage: editPost.coverImage || "",
                gallery: editPost.gallery || [],
                content: editPost.content,
            });
        } else {
            setForm({
                title: "",
                slug: "",
                category: "",
                coverImage: "",
                gallery: [],
                content: "",
            });
            setStep(1);
        }
    }, [editPost]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setForm({ ...form, coverImage: reader.result as string });
        reader.readAsDataURL(file);
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const readers = files.map((file) => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(readers).then((images) => {
            setForm({ ...form, gallery: [...form.gallery, ...images] });
        });
    };
  const removeGalleryImage = (index: number) => {
        const updatedGallery = form.gallery.filter((_, i) => i !== index);
        setForm({ ...form, gallery: updatedGallery });
    };
    const handleSubmit = () => {
    if (!form.title || !form.slug || !form.category || !form.content) {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please fill in all required fields",
        });
        return;
    }

    const postData: Post = {
    
        id: editPost ? editPost.id : Date.now(),
        // For editing: keep the original date, for new posts use current date
        date: editPost ? editPost.date : new Date().toLocaleDateString(),
        // For editing: keep the original sharingTime, for new posts use current date
        sharingTime: editPost ? editPost.sharingTime : new Date().toLocaleDateString(),
        // For editing: keep the original status and author
        status: editPost ? editPost.status : "Published",
        author: editPost ? editPost.author : "Admin",
      
        ...form,
        type: form.category as "News" | "Announcement",
        image: form.coverImage
    };
    
    onSave(postData);
    Swal.fire({
        icon: "success",
        title: editPost ? "Updated Successfully!" : "Added Successfully!",
        showConfirmButton: false,
        timer: 2000,
    });
    onClose();
};

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="lang-switch">
                    <button className="lang active">AZ</button>
                    <button className="lang">EN</button>
                </div>

                <h2>Create News / Announcement</h2>

                <div className="progress">
                    <div className={`bar ${step >= 1 ? "active" : ""}`} />
                    <div className={`bar ${step === 2 ? "active" : ""}`} />
                    <span className="step">{step}/2</span>
                </div>

                {step === 1 ? (
                    <div>
                        <label>Title *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                        <label>Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            placeholder="naa.edu.az/"
                            value={form.slug}
                            onChange={handleChange}
                            required
                        />

                        <label>Category *</label>
                        <div className="cat-buttons">
                            {["News", "Announcement"].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`cat ${form.category === cat ? "active" : ""}`}
                                    onClick={() => setForm({ ...form, category: cat })}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <label>Cover Image</label>
                        <div className="upload-box">
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            {form.coverImage ? (
                                <img src={form.coverImage} alt="cover" className="preview" />
                            ) : (
                                <span>Upload Cover Image</span>
                            )}
                        </div>

                        <label>HTML Content *</label>
                        <textarea
                            name="content"
                            placeholder="Write your content here..."
                            value={form.content}
                            onChange={handleChange}
                            required
                        />

                        <button onClick={() => setStep(2)} className="next-btn">
                            Next
                        </button>
                    </div>
                ) : (
                    <div className="step-content">
                        <label>Gallery Images</label>
                        <p className="text-sm text-gray-500">JPG/PNG, multiple allowed</p>
                        <div className="upload-box">
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple 
                                onChange={handleGalleryUpload} 
                                id="gallery-upload"
                            />
                            <label htmlFor="gallery-upload" className="upload-label">
                                <span>📁 Upload Gallery Images</span>
                            </label>
                        </div>
                         {form.gallery.length > 0 && (
                            <div className="gallery-section">
                                <label>Gallery Preview</label>
                                <div className="gallery-preview">
                                    {form.gallery.map((img, idx) => (
                                        <div key={idx} className="gallery-image-container">
                                            <img src={img} alt={`gallery-${idx}`} />
                                            <button 
                                                type="button"
                                                className="remove-gallery-btn"
                                                onClick={() => removeGalleryImage(idx)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="footer-btns">
                            <button onClick={() => setStep(1)} className="cancel-btn">
                                Back
                            </button>
                            <button onClick={handleSubmit} className="submit-btn">
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}