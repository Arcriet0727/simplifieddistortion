precision highp float;

#define PI 3.14159265358979323846

varying vec2 vTexCoord;
uniform sampler2D uTex;

void main() {
  float longitude = mix(-PI, PI, vTexCoord.x);
  float latitude = mix(-PI/2.0, PI/2.0, vTexCoord.y);
  float VFOV=2.0*PI/9.0;
  float HFOV=2.0*atan(tan(VFOV/2.0)*16.0/9.0);
  float Yboard=atan(tan(VFOV/2.0)*cos(longitude));
  
if ((longitude >= -HFOV/2.0) && (longitude <= HFOV/2.0)&& (latitude <= Yboard)&& (latitude >= -Yboard)) {

  float transfactlong=(longitude+(HFOV/2.0))/(HFOV);
  float transfactlat=(latitude+Yboard)/(2.0*Yboard);
  float aflong=mix(-HFOV/2.0,HFOV/2.0,transfactlong);
  float aflat=mix(-VFOV/2.0,VFOV/2.0,transfactlat);
  float factorx=tan(aflong)*(0.5/tan(HFOV/2.0))+0.5;
  float factory=tan(aflat)*(0.5/tan(VFOV/2.0))+0.5;
  vec2 transjingwei=vec2(1.0-factorx,factory);
  gl_FragColor = texture2D(uTex, transjingwei);
} else{
  gl_FragColor = vec4(1.0);
}

 
}
