import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  imports: [RouterOutlet,RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  blogId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.blogForm = this.fb.group({
      // title: ['', Validators.required],
      text: ['', Validators.required],
      username: ['', Validators.required],
      dateCreated: ['', Validators.required],
      id:Number

    });
    this.blogId=0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const tempid= Number(id);
    if (tempid>0) {
      this.isEditMode = true;
      this.blogId = Number(id);
      this.blogService.getBlogById(this.blogId).subscribe(data => {
        this.blogForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      return;
    }

    const blogPost = this.blogForm.value;
    if (this.isEditMode) {
      this.blogService.updateBlog(blogPost).subscribe(() => {
        this.router.navigate(['/blogedit', blogPost.id]);
      });
    } else {
      this.blogService.addBlog(blogPost).subscribe((newBlogPost) => {
        this.router.navigate(['/blogedit', newBlogPost.id]);
      });
    }
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['/blogedit', this.blogId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
