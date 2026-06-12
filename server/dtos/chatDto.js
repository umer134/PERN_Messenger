
exports.module = class chatDto {
  id;
  is_group;
  group_name;
  group_avatar;
  created_at;

  constructor(model) {
    this.id = model.id;
    this.is_group = model.is_group;
    this.group_name = model.group_name;
    this.group_avatar = model.group_avatar;
    this.created_at = model.created_at;
  };
};