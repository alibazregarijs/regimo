"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Post = {
  title: string;
  content: string;
  buttonText?: string;
  body?: string;
  fields?: {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    defaultValue: string;
    inputType?: {
      name: string;
      value: string;
    }[];
  }[];
};

type PostCardProps = PropsWithChildren & {
  post: Post;
  onSubmit?: (formData: Record<string, string>) => void;
  isOpenModal?: boolean;
  setOpenModal?: (value: boolean) => void;
};

type PostCardContext = {
  post: Post;
  formData: Record<string, string>;
  handleInputChange: (fieldName: string, value: string) => void;
  handleSelectChange: (fieldName: string, value: string) => void;
};

const PostCardContext = createContext<PostCardContext | undefined>(undefined);

function usePostCardContext() {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("usePostCardContext must be used within a PostCardContext");
  }
  return context;
}

export function AddModal({
  children,
  post,
  onSubmit,
  isOpenModal,
  setOpenModal,
}: PostCardProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(
    (post.fields || []).reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({});
    setOpenModal?.(false);
  };

  return (
    <PostCardContext.Provider
      value={{
        post,
        formData,
        handleInputChange,
        handleSelectChange,
      }}
    >
      <Dialog open={isOpenModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          {!isOpenModal && <Button>{post.title}</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            {children}
          </form>
        </DialogContent>
      </Dialog>
    </PostCardContext.Provider>
  );
}

AddModal.Title = function PostCardTitle() {
  const { post } = usePostCardContext();
  return (
    <DialogHeader>
      <DialogTitle>{post.title}</DialogTitle>
    </DialogHeader>
  );
};

AddModal.Content = function PostCardContent() {
  const { post } = usePostCardContext();
  return (
    <DialogHeader>
      <DialogDescription>{post.content}</DialogDescription>
    </DialogHeader>
  );
};

AddModal.Body = function PostCardBody() {
  const { post, formData, handleInputChange, handleSelectChange } =
    usePostCardContext();

  return (
    <div>
      {post.fields ? (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            {post.fields?.map((field) => (
              <div key={field.name}>
                {!field.inputType ? (
                  <div>
                    <Label htmlFor={field.name} className="text-right mb-2">
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] || ""}
                      placeholder={field.placeholder}
                      className="col-span-3"
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>{field.label}</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange(field.name, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {field.inputType.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DialogDescription className="mt-4">{post.body}</DialogDescription>
      )}
    </div>
  );
};

AddModal.Footer = function PostCardFooter() {
  const { post } = usePostCardContext();
  return (
    <DialogFooter>
      <Button type="submit">{post.buttonText}</Button>
    </DialogFooter>
  );
};
