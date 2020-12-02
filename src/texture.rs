use web_sys::WebGlRenderingContext as GL;
use wasm_bindgen::JsValue;
use web_sys::*;

use nalgebra::{Vector3};
use palette::rgb::Rgb;
use palette::encoding::srgb::Srgb;

use std::f32;
// use std::f32::consts::PI;

pub struct Framebuffer{
    _w_: i32,
    _h_: i32,
    fb_: WebGlFramebuffer,
    c_: WebGlTexture,
}

impl Framebuffer {
    pub fn new(gl: &GL, width: i32, height: i32) -> Result<Framebuffer, JsValue> {
        let fb = gl.create_framebuffer().ok_or("failed to create framebuffer")?;

        gl.bind_framebuffer(GL::FRAMEBUFFER, Some(&fb));

        // create rgb texture
        let c = Framebuffer::create_float_texture(&gl, width, height)?;

        let attachment0 = GL::COLOR_ATTACHMENT0;
        gl.framebuffer_texture_2d(GL::FRAMEBUFFER, attachment0, GL::TEXTURE_2D, Some(&c), 0);

        gl.bind_framebuffer(GL::FRAMEBUFFER, None);

        Ok(Framebuffer {
            _w_: width,
            _h_: height,
            fb_: fb,
            c_: c,
        })
    }

    pub fn delete_buffers(&self, gl: &GL) {
        gl.delete_texture(Some(&self.c_));
        gl.delete_framebuffer(Some(&self.fb_));
    }

    pub fn create_with_data(gl: &GL, width: i32, height: i32, texture_data: Vec<f32>) -> Result<Framebuffer, JsValue>{
        let fb = gl.create_framebuffer().ok_or("failed to create framebuffer")?;
        let texture = create_texture(&gl, width, height, &texture_data)?;
        gl.bind_framebuffer(GL::FRAMEBUFFER, Some(&fb));

        let attachment0 = GL::COLOR_ATTACHMENT0;
        gl.framebuffer_texture_2d(GL::FRAMEBUFFER, attachment0, GL::TEXTURE_2D, Some(&texture), 0);

        gl.bind_framebuffer(GL::FRAMEBUFFER, None);

        Ok(Framebuffer {
            _w_: width,
            _h_: height,
            fb_: fb,
            c_: texture,
        })
    }

    pub fn bind(&self, gl: &GL) {
        gl.bind_framebuffer(GL::FRAMEBUFFER, Some(&(self.fb_)));
    }

    pub fn unbind(&self, gl: &GL) {
        gl.bind_framebuffer(GL::FRAMEBUFFER, None);
    }

    pub fn get_texture(&self) -> &WebGlTexture {
        &self.c_
    }

    // create the rgb texture for the framebuffer
    fn create_float_texture(gl: &GL, width: i32, height: i32) -> Result<WebGlTexture, JsValue> {
        let render_texture = gl.create_texture().ok_or("failed to create rgb texture")?;
        gl.bind_texture(GL::TEXTURE_2D, Some(&(render_texture)));
        // uh what lol
        gl.tex_image_2d_with_i32_and_i32_and_i32_and_format_and_type_and_opt_array_buffer_view(
            GL::TEXTURE_2D, 0, GL::RGBA as i32, width, height, 0, GL::RGBA, GL::FLOAT, None)?;

        gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MIN_FILTER, GL::LINEAR as i32);
        gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_S, GL::CLAMP_TO_EDGE as i32);
        gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_T, GL::CLAMP_TO_EDGE as i32);

        gl.bind_texture(GL::TEXTURE_2D, None);

        Ok(render_texture)
    }
}

// https://stackoverflow.com/questions/9046643/webgl-create-texture
// post on how to create texture from pixel data.
pub fn create_texture(gl: &GL, width: i32, height: i32, data: &[f32]) -> Result<WebGlTexture, JsValue> {
    let cb_texture =  gl.create_texture().ok_or("failed to create rgb texture")?;

    if data.len() != (width * height * 4) as usize {
        return Err(JsValue::from_str("invalid texture data"));
    }

    gl.bind_texture(GL::TEXTURE_2D, Some(&cb_texture));

    unsafe {
        let pixel_array = js_sys::Float32Array::view(data);
        gl.tex_image_2d_with_i32_and_i32_and_i32_and_format_and_type_and_opt_array_buffer_view(
            GL::TEXTURE_2D, 0, GL::RGBA as i32, width, height, 0, GL::RGBA, GL::FLOAT, Some(&pixel_array))?;
    }

    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MIN_FILTER, GL::LINEAR as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_S, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_T, GL::CLAMP_TO_EDGE as i32);

    gl.bind_texture(GL::TEXTURE_2D, None);

    Ok(cb_texture)
}

pub fn get_rainbow_array() -> Vec<palette::rgb::Rgb> {
    let mut colors = Vec::new();
    let mut c = Rgb::<Srgb, f32>::new(1.0, 0.0, 0.0);
    colors.push(c);
    for _ in 1..100 {
        c.green += 0.01;
        colors.push(c);
    }
    for _ in 1..100 {
        c.red -= 0.01;
        colors.push(c);
    }
    for _ in 1..100 {
        c.blue += 0.01;
        colors.push(c);
    }
    for _ in 1..100 {
        c.green -= 0.01;
        colors.push(c);
    }
    for _ in 1..100 {
        c.red += 0.01;
        colors.push(c);
    }
    for _ in 1..100 {
        c.blue -= 0.01;
        colors.push(c);
    }

    colors
}

pub fn make_checkerboard_array(width: i32, height: i32) -> Vec<f32> {
    let mut data = Vec::with_capacity((width * height * 4) as usize);

    let block_size = width/10;
    for x in 0..width {
        for y in 0..height {
            let x_step = x/block_size;
            let y_step = y/block_size;

            let mut val = 0.0;
            if (x_step + y_step) % 2 == 0 {
                val = 1.0;
            }

            data.push(1.0-val);
            data.push(1.0-val);
            data.push(1.0);
            data.push(1.0);
        }
    }

    data
}


pub fn make_constant_vector_field(width: f32, height: f32) -> Vec<f32> {
    let mut data = Vec::with_capacity((width * height * 4.0) as usize);

    for _ in 0..(height as i32){
        for _ in 0..(width as i32) {
            let v = Vector3::new(0.0, 0.0, 0.0);

            data.push(v.x);
            data.push(v.y);
            data.push(0.0);
            data.push(1.0);
        }
    }

    data
}

pub fn make_tube_obstacles(width: f32, height: f32) -> Vec<f32> {
    let mut data = Vec::with_capacity((width * height * 4.0) as usize);
    for r in 0..(height as i32){
        for _c in 0..(width as i32) {
            if r == 0 {
                data.push(0.0);
                data.push(1.0);
                data.push(0.0);
                data.push(0.0);
            }
            else if r == (height as i32) - 1 {
                data.push(0.0);
                data.push(-1.0);
                data.push(0.0);
                data.push(0.0);
            }
            // else if _c == (width as i32) - 1 {
            //     data.push(-1.0);
            //     data.push(0.0);
            //     data.push(0.0);
            //     data.push(1.0);
            // }
            else if _c == 192
            {
                if r >= 192 && r <= 320
                {
                    data.push(-1.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
                else
                {
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
            }
            else if _c == 320
            {
                if r >= 192 && r <= 320
                {
                    data.push(1.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
                else
                {
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
            }
            else if r == 192
            {
                if _c >= 192 && _c <= 320
                {
                    data.push(0.0);
                    data.push(-1.0);
                    data.push(0.0);
                    data.push(0.0);
                }
                else
                {
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
            }
            else if r == 320
            {
                if _c >= 192 && _c <= 320
                {
                    data.push(0.0);
                    data.push(1.0);
                    data.push(0.0);
                    data.push(0.0);
                }
                else
                {
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                    data.push(0.0);
                }
            }
            else if r > 192 && r < 320 && _c > 192 && _c < 320
            {
                // Interior del cubo
                data.push(0.0);
                data.push(0.0);
                data.push(0.0);
                data.push(1.0);
            }
            else {
                data.push(0.0);
                data.push(0.0);
                data.push(0.0);
                data.push(0.0);
            }

        }
    }

    data
}
